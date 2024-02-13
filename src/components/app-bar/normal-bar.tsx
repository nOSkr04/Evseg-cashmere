import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { LogoText } from "../common/logo-text";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
const NormalBar = memo(() => {
  const navigation = useNavigation();
  const sf = useSafeAreaInsets();
  const safeStyle = useCallback(() => {
    return {
      paddingTop  : sf.top,
      paddingLeft : sf.left + 16,
      paddingRight: sf.right + 24,
    };
  }, [sf.left, sf.right, sf.top]);

  return (
    <View style={[styles.root, safeStyle()]}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationRoutes.HomeScreen)}
        style={styles.button}
      >
        <AntDesign color={Colors.primary} name="left" size={24} />
      </TouchableOpacity>
      <LogoText />
    </View>
  );
});

NormalBar.displayName = "NormalBar";

export { NormalBar };

const styles = StyleSheet.create({
  root: {
    flexDirection  : "row",
    backgroundColor: Colors.white,
    justifyContent : "space-between",
    alignItems     : "center",
  },
  button: {
    padding: 8,
  },
});
