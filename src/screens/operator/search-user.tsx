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
import useSWR from "swr";
const SearchUserScreen = memo(() => {
  const [query, setQuery] = useState("");
  const [queryText, setQueryText] = useState("");

  const { data, isLoading } = useSWR(
    query ? `swr.search.${query}` : null,
    async () => {
      const res = await UserApi.findUserPhone(query);
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
        data={data?.data}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        style={styles.container}
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
