import {  TextProps } from "./themed";
import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
export function BoldText(props: TextProps) {
  return <Animated.Text {...props} style={[props.style, styles.BoldText]} />;
}
export function SemiBoldText(props: TextProps) {
  return <Animated.Text {...props} style={[props.style, styles.SemiBoldText]} />;
}
export function MediumText(props: TextProps) {
  return <Animated.Text {...props} style={[props.style, styles.MediumText]} />;
}
export function RegularText(props: TextProps) {
  return <Animated.Text {...props} style={[props.style, styles.RegularText]} />;
}
export function ThinText(props: TextProps) {
  return <Animated.Text {...props} style={[props.style, styles.ThinText]} />;
}


const styles = StyleSheet.create({
  BoldText: {
    fontFamily: "NunBold",
  },
  SemiBoldText: {
    fontFamily: "NunSemiBold",
  },
  MediumText: {
    fontFamily: "NunMedium"
  },
  RegularText: {
    fontFamily: "NunRegular"
  },
  ThinText: {
    fontFamily: "NunThin"
  }
});