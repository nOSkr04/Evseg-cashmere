/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {  Text as DefaultText,  } from "react-native";
import React from "react";

export type TextProps = DefaultText["props"];

export function Text(props: TextProps) {
  const { style,  ...otherProps } = props;

  return <DefaultText style={style} {...otherProps} />;
}


