import { StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import { MediumText, ThinText } from "./styled-text";
import { Colors } from "../../constants/colors";
import Animated from "react-native-reanimated";

const AuthLogo = memo(() => {
    return (
      <Animated.View sharedTransitionTag={"auth"} style={styles.top}>
        <ThinText style={styles.logoText}>EVSEG</ThinText>
        <View style={styles.divider} />
        <MediumText style={styles.logoText1}>Mongolian  Premium  Cashmere</MediumText>
      </Animated.View>
    );
  });

  AuthLogo.displayName="AuthLogo";

export { AuthLogo };

const styles = StyleSheet.create({
    top: {
        alignItems    : "center",
        justifyContent: "center",
        flex          : 1
      },
      logoText1: {
        color    : Colors.white,
        textAlign: "center",
        fontSize : 13,
      },
      logoText: {
        fontSize     : 60,
        color        : Colors.white,
        textAlign    : "center",
        letterSpacing: 8
      },
      divider: {
        marginVertical : 5,
        width          : 210,
        alignSelf      : "center",
        height         : 2,
        backgroundColor: Colors.white,
      },
});