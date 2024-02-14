import { StyleSheet,   } from "react-native";
import React, { memo,  } from "react";
import { Colors } from "../../constants/colors";
import { Text } from "../../components/common/themed";

const LabelRender = memo(({ name }: { name: string }) => {

    if (name === "All") {
        return <Text style={styles.title}>Бүгд</Text>;
    }
    if (name === "Sum") {
        return <Text style={styles.title}>Олгосон</Text>;
    }
    if (name === "Minus") {
        return <Text style={styles.title}>Суутгасан</Text>;
    }
    return (
      <></>
    );
});

LabelRender.displayName = "LabelRender";

export { LabelRender };

const styles = StyleSheet.create({
    title: {
        color         : Colors.black,
        fontSize      : 14,
        textAlign     : "center",
        marginVertical: 8,
    },
   
});