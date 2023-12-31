import { Dimensions, StyleSheet } from "react-native";
import React, { memo, useCallback } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { HomeBar } from "../../components/app-bar/home-bar";
import { ParallaxView } from "../../components/home/parallax-view";
import { IParentProduct } from "../../interface/parent-product";
import { ParentProductCard } from "../../components/home/parent-product-card";

const width = Dimensions.get("window").width;
const HomeScreen = memo(() => {
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
    { _id : "fjdsofs", name: "Flash sale",  data: [
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

  return (
    <>
      <HomeBar />
      <Animated.FlatList
        ListHeaderComponent={<ParallaxView shared={shared} />}
        data={data}
        onScroll={scrollHandler}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      />
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
  image: {
    height: 300,
    width,
  },
});
