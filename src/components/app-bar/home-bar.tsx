import { StyleSheet,  TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { Octicons  } from "@expo/vector-icons";
import { LogoText } from "../common/logo-text";
const HomeBar = memo(({ openDrawer, }: { openDrawer: () => void, }) => {
    const sf = useSafeAreaInsets();
    const safeStyle = useCallback(() => {
        return{
            paddingTop  : sf.top,
            paddingLeft : sf.left + 16,
            paddingRight: sf.right + 24,
        };
    },[ sf.left, sf.right, sf.top]);
    
    return (
      <View style={[styles.root, safeStyle()]}>
        <TouchableOpacity onPress={openDrawer} style={styles.button}>
          <Octicons color={Colors.primary} name="three-bars" size={24} />
        </TouchableOpacity>
        <LogoText/>
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
        padding: 8,
    },
 
});