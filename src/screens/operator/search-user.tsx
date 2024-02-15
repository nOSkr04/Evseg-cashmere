import { FlatList, StyleSheet } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { NormalBar } from "../../components/app-bar/normal-bar";
import { Colors } from "../../constants/colors";
import { IUser } from "../../interface/user";
import { UserList } from "../../components/operator/user-list";
import { SearchField } from "../../components/operator/search-field";
import { UserApi } from "../../api";
import useSWRInfinite from "swr/infinite";
import { RefreshControl } from "react-native-gesture-handler";
import { Loader } from "../../components/common/loader";
const SearchUserScreen = memo(() => {
  const [query, setQuery] = useState("");
  const [queryText, setQueryText] = useState("");
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `swr.user.${query}.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const res = await UserApi.findUserPhone({
        page: parseInt(`${page || 1}`, 10) + 1,
        limit: 10,
        // field: query,
      });
      return res;
    }
  );

  const renderItem = useCallback(({ item }: { item: IUser }) => {
    return <UserList item={item} />;
  }, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return <Loader />;
    }
    return <></>;
  }, [isLoading]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (query !== queryText) {
        setQuery(queryText);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, queryText, setQuery]);

  return (
    <>
      <NormalBar />
      <FlatList
        ListHeaderComponent={
          <SearchField setQueryText={setQueryText} queryText={queryText} />
        }
        data={(data || []).map((entry) => entry?.data).flat() as IUser[]}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        style={styles.container}
        onEndReached={() => {
          setSize(size + 1);
        }}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setSize(1);
            }}
            refreshing={isLoading}
          />
        }
      />
    </>
  );
});

SearchUserScreen.displayName = "SearchUserScreen";

export { SearchUserScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
