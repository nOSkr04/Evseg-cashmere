import { RefreshControl, StyleSheet, View } from "react-native";
import React, { memo, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { Tabs } from "react-native-collapsible-tab-view";
import { TransactionApi } from "../../api";
import { ITransaction } from "../../interface/transaction";
import { TransactionList } from "./transaction-list";
import { Loader } from "../common/loader";
const SumTransactions = memo(() => {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `swr.transaction.sum.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const res = await TransactionApi.sumTransactions({
        page: parseInt(`${page || 1}`, 10) + 1,
        limit: 10,
      });
      return res;
    }
  );

  const renderItem = useCallback(({ item }: { item: ITransaction }) => {
    return <TransactionList item={item} />;
  }, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return <Loader />;
    }
    return <></>;
  }, [isLoading]);

  return (
    <Tabs.FlatList
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={<View style={styles.h10} />}
      ListHeaderComponent={<View style={styles.h10} />}
      data={(data || []).map((entry) => entry?.data).flat() as ITransaction[]}
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
      renderItem={renderItem}
      style={styles.container}
    />
  );
});

SumTransactions.displayName = "SumTransactions";

export { SumTransactions };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h10: {
    height: 10,
  },
});
