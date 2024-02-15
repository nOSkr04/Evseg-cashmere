import { StyleSheet } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/colors";
import { MediumText } from "../common/styled-text";

const LabelRender = memo(({ name }: { name: string }) => {
  if (name === "All") {
    return <MediumText style={styles.title}>Бүгд</MediumText>;
  }
  if (name === "Sum") {
    return <MediumText style={styles.title}>Олгосон</MediumText>;
  }
  if (name === "Minus") {
    return <MediumText style={styles.title}>Суутгасан</MediumText>;
  }
  return <></>;
});

LabelRender.displayName = "LabelRender";

export { LabelRender };

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: 14,
    textAlign: "center",
    marginVertical: 8,
  },
});
