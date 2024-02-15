import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { memo, useCallback, useState } from "react";

import { Colors } from "../../constants/colors";
import { HomeBar } from "../../components/app-bar/home-bar";
import { Drawer } from "react-native-drawer-layout";
import { DrawerContent } from "../../components/home/drawer-content";
import { OperatorBanner } from "../../components/operator/operator-banner";
import { TransactionApi, UserApi } from "../../api";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import { ITransaction } from "../../interface/transaction";
import { TransactionList } from "../../components/operator/transaction-list";
import { Loader } from "../../components/common/loader";
import { TransactionTabs } from "../../components/operator/transaction-tabs";

const OperatorScreen = memo(() => {
  const { data: user } = useSWR("swr.user.me", async () => {
    const res = await UserApi.userMe();
    return res;
  });
  const [tab, setTab] = useState("All");
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `swr.transaction.${tab}.${index}`,
    async (index) => {
      const page = index.split(".").pop();
      const res = await TransactionApi.transactions({
        page: parseInt(`${page || 1}`, 10) + 1,
        limit: 10,
        tab: tab,
      });
      return res;
    }
  );
  const [open, setOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

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
    <>
      <Drawer
        drawerPosition="left"
        drawerStyle={styles.drawer}
        drawerType="slide"
        onClose={closeDrawer}
        onOpen={openDrawer}
        open={open}
        renderDrawerContent={() => {
          return <DrawerContent />;
        }}
        style={styles.root}
      >
        <View style={styles.root}>
          <HomeBar openDrawer={openDrawer} />
          <FlatList
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={<View style={styles.h10} />}
            ListHeaderComponent={
              <>
                <OperatorBanner />
                <TransactionTabs setTab={setTab} tab={tab} />
              </>
            }
            data={
              (data || []).map((entry) => entry?.data).flat() as ITransaction[]
            }
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
        </View>
      </Drawer>
    </>
  );
});

OperatorScreen.displayName = "OperatorScreen";

export { OperatorScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  drawer: {
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  h10: {
    height: 10,
  },
});
