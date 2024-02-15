import { RefreshControl, StyleSheet, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { HomeBar } from "../../components/app-bar/home-bar";
import { ParallaxView } from "../../components/home/parallax-view";
import { IParentProduct } from "../../interface/parent-product";
import { ParentProductCard } from "../../components/home/parent-product-card";
import { Drawer } from "react-native-drawer-layout";
import { DrawerContent } from "../../components/home/drawer-content";
import useSWR from "swr";
import { UserApi } from "../../api";
const HomeScreen = memo(() => {
  const { data: user } = useSWR("swr.user.me", async () => {
    const res = await UserApi.userMe();
    return res;
  });

  const [open, setOpen] = useState(false);
  const shared = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    shared.value = event.contentOffset.y;
  });

  const data = [
    {
      _id: "1",
      name: "Цагаан сарийн урамшуулал 1+1",
      data: [
        {
          _id: "1",
          name: "Сүлжмэл бор цамц",
          image: require("../../assets/evseg/1.jpg"),
          price: 290000,
        },
        {
          _id: "qwe1",
          name: "Сүлжмэл цоохор цамц",
          image: require("../../assets/evseg/2.jpg"),
          price: 250000,
        },
        {
          _id: "1sdasd",
          name: "Сүлжмэл цагаан цамц",
          image: require("../../assets/evseg/3.jpg"),
          price: 270000,
        },
        {
          _id: "1fsdfsd",
          name: "Сүлжмэл цамц",
          image: require("../../assets/evseg/4.jpg"),
          price: 230000,
        },
        {
          _id: "1fdsvsd",
          name: "Сүлжмэл саарал цамц",
          image: require("../../assets/evseg/5.jpg"),
          price: 220000,
        },
        {
          _id: "1vmosdmos",
          name: "Сүлжмэл бор цамц",
          image: require("../../assets/evseg/6.jpg"),
          price: 760000,
        },
      ],
    },
    {
      _id: "2",
      name: "Valentine collection",
      data: [
        {
          _id: "1",
          name: "Улаан нөмрөг",
          image: require("../../assets/evseg/11.jpg"),
        },
        {
          _id: "qwe1",
          name: "Улаан пальто",
          image: require("../../assets/evseg/12.jpg"),
        },
        {
          _id: "1sdasd",
          name: "Улаан ороолт ",
          image: require("../../assets/evseg/13.jpg"),
        },
        {
          _id: "1fsdfsd",
          name: "Улаан ноолууран цамц ",
          image: require("../../assets/evseg/14.jpg"),
        },
        {
          _id: "1fdsvsd",
          name: "Цагаан пальто",
          image: require("../../assets/evseg/15.jpg"),
        },
        {
          _id: "1vmosdmos",
          name: "Улаан бээлий ",
          image: require("../../assets/evseg/16.jpg"),
        },
      ],
    },
    {
      _id: "fjdsofs",
      name: "Цагаан сарийн xямдрал",
      data: [
        {
          _id: "1",
          name: "Бор сүлжмэл майк",
          image: require("../../assets/evseg/21.jpg"),
          price: 95000,
        },
        {
          _id: "qwe1",
          name: "Цэнхэр сүлжмэл цамц",
          image: require("../../assets/evseg/22.jpg"),
          price: 115000,
        },
        {
          _id: "1sdasd",
          name: "Ягаан сүлжмэл цамц",
          image: require("../../assets/evseg/23.jpg"),
          price: 190000,
        },
        {
          _id: "1fsdfsd",
          name: "Улаан сүлжмэл цамц",
          image: require("../../assets/evseg/24.jpg"),
          price: 115000,
        },
        {
          _id: "1fdsvsd",
          name: "Принттэй шааль",
          image: require("../../assets/evseg/25.jpg"),
          price: 181300,
        },
        {
          _id: "1vmosdmos",
          name: "Принттэй шааль",
          image: require("../../assets/evseg/26.jpg"),
          price: 181300,
        },
      ],
    },
  ];

  const renderItem = useCallback(({ item }: { item: IParentProduct }) => {
    return <ParentProductCard product={item} />;
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  // const onRefresh = () => {
  //   setTimeout(() => {
  //     setRefreshing(false);
  //     mutate("swr.user.me");
  //   }, 500);
  // };

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
        <HomeBar openDrawer={openDrawer} />
        <Animated.FlatList
          ListFooterComponent={<View style={styles.footer} />}
          ListHeaderComponent={<ParallaxView shared={shared} user={user} />}
          data={data}
          onScroll={scrollHandler}
          // refreshControl={
          //   <RefreshControl
          //     onRefresh={onRefresh}
          //     refreshing={refreshing}
          //     style={styles.refresh}
          //   />
          // }
          renderItem={renderItem}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={styles.container}
        />
      </Drawer>
    </>
  );
});

HomeScreen.displayName = "HomeScreen";

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  drawer: {
    backgroundColor: Colors.white,
  },
  footer: {
    height: 24,
  },
  refresh: { zIndex: 999 },
});
