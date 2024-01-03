import {  StyleSheet, View,  } from "react-native";
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
  const { data: user } = useSWR("swr.user.me", async() => {
    const res = await UserApi.me();
    return res;
  });
  const [open, setOpen] = useState(false);
  const shared = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    shared.value = event.contentOffset.y;
  });


  const data = [
    {
      _id : "1",
      name: "Christmas sale",
      data: [
        {
          _id : "1",
          name: "15",
          image:
            "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
        },
        {
          _id : "qwe1",
          name: "15",
          image:
            "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
        },
        {
          _id : "1sdasd",
          name: "15",
          image:
            "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
        },
        {
          _id : "1fsdfsd",
          name: "15",
          image:
            "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
        },
        {
          _id : "1fdsvsd",
          name: "15",
          image:
            "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
        },
        {
          _id : "1vmosdmos",
          name: "15",
          image:
            "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
        },
      ],
    },
    { _id : "2", name: "Flash sale",  data: [
      {
        _id : "1",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "qwe1",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1sdasd",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1fsdfsd",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1fdsvsd",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1vmosdmos",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
    ], },
    { _id : "fjdsofs", name: "Spring",  data: [
      {
        _id : "1",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "qwe1",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1sdasd",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1fsdfsd",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1fdsvsd",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
      {
        _id : "1vmosdmos",
        name: "15",
        image:
          "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D",
      },
    ], },
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
        <HomeBar openDrawer={openDrawer}/>
        <Animated.FlatList
        ListFooterComponent={<View style={styles.footer} />}
        ListHeaderComponent={<ParallaxView shared={shared} user={user} />}
        data={data}
        onScroll={scrollHandler}
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
    flex           : 1,
    backgroundColor: Colors.white,
  },
  root: {
    flex           : 1,
    backgroundColor: Colors.white,
  },

  drawer: {
    backgroundColor: Colors.white
  },
  footer: {
    height: 24,
  }
});
