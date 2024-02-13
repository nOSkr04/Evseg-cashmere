import { StyleSheet,  TouchableOpacity,  } from "react-native";
import React, { ReactNode, memo } from "react";
import { SemiBoldText } from "../common/styled-text";
import { Colors } from "../../constants/colors";

type Props ={
    icon: ReactNode;
    title: string;
    onPress?: () => void
}

const DrawerCards = memo(({ icon, title,onPress }: Props) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {icon}
        <SemiBoldText style={styles.title}>{title}</SemiBoldText>
      </TouchableOpacity>
    );
  });

  DrawerCards.displayName="DrawerCards";

export { DrawerCards };

const styles = StyleSheet.create({
    container: {
        marginTop       : 8,
        flexDirection   : "row",
        alignItems      : "center",
        paddingVertical : 12,
        marginHorizontal: 24
    },
    title: {
        fontSize  : 15,
        lineHeight: 24,
        marginLeft: 6,
        color     : Colors.primaryText
    }
});