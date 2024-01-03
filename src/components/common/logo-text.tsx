import { StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import { BoldText } from "./styled-text";
import { Colors } from "../../constants/colors";

const LogoText = memo(() => {
    return (
      <View style={styles.logoContainer}>
        <BoldText style={styles.logoText}>E V S E G</BoldText>
        <View style={styles.logoDivider}  />
        <BoldText style={styles.logoText1}>Mongolian Premium Cashmere</BoldText>
      </View>
    );
  });

  LogoText.displayName="LogoText";

export { LogoText };

const styles = StyleSheet.create({
    logoText: {
        color   : Colors.primary,
        fontSize: 30
    },
    logoText1: {
        color   : Colors.primary,
        fontSize: 9
    },
    logoDivider: {
      height         : 1,
      backgroundColor: Colors.primary,
    },
    logoContainer: {
      paddingBottom: 12
    }
});