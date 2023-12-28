import { StyleSheet,  TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { BoldText,  } from "../common/styled-text";
const HomeBar = memo(() => {
    const sf = useSafeAreaInsets();
    const safeStyle = useCallback(() => {
        return{
            paddingTop   : sf.top,
            paddingBottom: sf.bottom,
            paddingLeft  : sf.left + 16,
            paddingRight : sf.right + 24,
        };
    },[sf.bottom, sf.left, sf.right, sf.top]);
    return (
      <View style={[styles.root, safeStyle()]}>
        <TouchableOpacity style={styles.button}>
          <Ionicons color={Colors.black} name="notifications" size={24} />
        </TouchableOpacity>
        <View>
          {/* <BoldText style={styles.logoText}>E V S E G</BoldText>
          <View style={styles.logoDivider}  />
          <BoldText style={styles.logoText1}>Mongolian Premium Cashmere</BoldText> */}
        </View>
      </View>
    );
  });

  HomeBar.displayName="HomeBar";
  
export { HomeBar };

const styles = StyleSheet.create({
    root: {
        flexDirection  : "row",
        backgroundColor: Colors.white,
        justifyContent : "space-between",
        alignItems     : "center"
    },
    button: {
        padding        : 8,
        paddingVertical: 12
    },
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
    }
});