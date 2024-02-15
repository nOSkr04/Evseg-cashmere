import {
    Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { memo, useCallback } from "react";
import { Colors } from "../../constants/colors";

const width = Dimensions.get("screen").width;

type Props = {
    setTab: React.Dispatch<React.SetStateAction<string>>
    tab: string
}

const TransactionTabs = memo(({ setTab, tab }: Props) => {
    const tabLabel = useCallback((tab: string) =>{
        if(tab === "All"){
            return <Text style={styles.label}>Бүгд</Text>;
        }
        if(tab === "Minus"){
            return <Text style={styles.label}>Суутгасан</Text>;
        }
        return <Text style={styles.label}>Олгосон </Text>;
    },[]);
  const renderItem = useCallback(({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => setTab(item)} style={[styles.container, tab === item && styles.primaryBorder]}>
        {tabLabel(item)}
      </TouchableOpacity>
    );
  }, [setTab, tab, tabLabel]);
  return (
    <FlatList
      data={["All", "Sum", "Minus"]}
      horizontal
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.root}
    />
  );
});

TransactionTabs.displayName = "TransactionTabs";

export { TransactionTabs };

const styles = StyleSheet.create({
    container: {
        width          : width / 3 - 24,
        borderWidth    : 2,
        marginRight    : 8,
        padding        : 5,
        borderRadius   : 8,
        alignItems     : "center",
        justifyContent : "center",
        borderColor    : Colors.textBlack60,
        paddingVertical: 10
    },
    root: {
        marginHorizontal: 24,
    },
    primaryBorder: {
        borderColor: Colors.primary
    },
    label: {
        fontWeight: "bold",
        fontSize  : 12,
        color     : Colors.textBlack
       
    },
  
});
