/* eslint-disable react/no-unstable-nested-components */
import {  StyleSheet,  } from "react-native";
import React, { memo, useCallback, useState } from "react";

import { Colors } from "../../constants/colors";
import { HomeBar } from "../../components/app-bar/home-bar";
import { Drawer } from "react-native-drawer-layout";
import { DrawerContent } from "../../components/home/drawer-content";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { OperatorBanner } from "./operator-banner";
import { AllTransactions } from "./all-transactions";
import { SumTransactions } from "./sum-transactions";
import { LabelRender } from "./label-render";
import { MinusTransactions } from "./minus-transactions";
const HEADER_HEIGHT = 150;
const Header = () => {
  return <OperatorBanner />;
};

const OperatorScreen = memo(() => {
  const [open, setOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

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
          return <DrawerContent  />;
        }}
        style={styles.root}
      >
        <HomeBar openDrawer={openDrawer}  />
        <>
          <Tabs.Container
            allowHeaderOverscroll
            headerHeight={HEADER_HEIGHT}
            lazy
            renderHeader={Header}
            renderTabBar={props => (
              <MaterialTabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: Colors.primary }}
                  />
            )}
    
          >
            <Tabs.Tab label={({ name }) => <LabelRender name={name} />} name="All" >
              <AllTransactions />
            </Tabs.Tab>
            <Tabs.Tab label={({ name }) => <LabelRender name={name} />} name="Sum">
              <SumTransactions />
            </Tabs.Tab>
            <Tabs.Tab label={({ name }) => <LabelRender name={name} />} name="Minus">
              <MinusTransactions />
            </Tabs.Tab>
          </Tabs.Container>
        </>
      </Drawer>
    </>
  );
});

OperatorScreen.displayName = "OperatorScreen";

export { OperatorScreen };

const styles = StyleSheet.create({

  root: {
    flex           : 1,
    backgroundColor: Colors.white,
  },

  drawer: {
    backgroundColor: Colors.white,
  },

});
