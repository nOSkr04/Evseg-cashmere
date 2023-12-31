import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import { HomeBar } from "../../components/app-bar/home-bar";
import { ParentProductCard } from "../../components/home/parent-product-card";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 140;

const HomeScreen = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
      ],
    };
  });

  const data = [
    { _id: "1", name: "fl", data: [{ _id: "1", name: "15" }] },
    { _id: "2", name: "fl1", data: [{ _id: "12", name: "14" }] },
    { _id: "3", name: "fl2", data: [{ _id: "13", name: "13" }] },
    { _id: "4", name: "fl3", data: [{ _id: "14", name: "12" }] },
  ];

  return (
    <View style={styles.root}>
      <HomeBar />
      <Animated.ScrollView
        bounces={false}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.image, imageAnimatedStyle]}>
          <Image
            source="https://images.unsplash.com/photo-1603302576837-37561b2e2302"
            style={{ width: IMG_HEIGHT / 2, height: IMG_HEIGHT / 2 }}
          />
        </Animated.View>
        <View style={styles.container}>
          {data.map((product) => {
            return <ParentProductCard key={product._id} product={product} />;
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
};
export { HomeScreen };

const styles = StyleSheet.create({
  root: {
    flex           : 1,
    backgroundColor: Colors.white,
  },
  image: {
    width            : width,
    height           : IMG_HEIGHT,
    backgroundColor  : Colors.primary,
    flexDirection    : "row",
    alignItems       : "center",
    justifyContent   : "space-between",
    paddingHorizontal: 24,
  },
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
  },
});
