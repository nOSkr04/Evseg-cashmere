import { ActivityIndicator, StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/colors";

const Loader = memo(() => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={Colors.primary} size={"large"}  />
      </View>
    );
  });

  Loader.displayName="Loader";

export { Loader };

const styles = StyleSheet.create({
    loader: {
        flex          : 1,
        alignItems    : "center",
        justifyContent: "center"
      }
});