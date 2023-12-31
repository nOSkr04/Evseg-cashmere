import { StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import Animated, { SharedValue } from "react-native-reanimated";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import useSWR from "swr";
import { IUser } from "../../interface/user";
import { BoldText, MediumText } from "../common/styled-text";

const ParallaxView = memo(({ shared }: { shared: SharedValue<number> }) => {
  const { data } = useSWR<IUser>("swr.user.me");
  const translateY = {
    transform: [
      {
        translateY: shared,
      },
    ],
  };
  return (
    <Animated.View style={[styles.container, translateY]}>
      <View>
        <View style={styles.pointContainer}>
          <BoldText style={styles.pointTitle}>Тании E-point</BoldText>
          <MediumText style={styles.pointDescription}>
            {data?.point || 0}
          </MediumText>
        </View>
      </View>
      <Image
        source={
        "https://images.pexels.com/photos/9056223/pexels-photo-9056223.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        }
        style={styles.qrCode}
      />
    </Animated.View>
  );
});

ParallaxView.displayName = "ParallaxView";

export { ParallaxView };

const styles = StyleSheet.create({
  container: {
    flexDirection    : "row",
    alignItems       : "center",
    justifyContent   : "space-between",
    backgroundColor  : Colors.primary,
    height           : 140,
    paddingHorizontal: 24
  },
  qrCode: {
    width : 90,
    height: 90,
  },
  pointContainer: {
    flexDirection: "row",
    alignItems   : "center",
  },
  pointTitle      : {},
  pointDescription: {},
});
