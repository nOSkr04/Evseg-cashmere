import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction, memo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/colors";

type Props = {
  setQueryText: Dispatch<SetStateAction<string>>;
  queryText: string;
};

const SearchField = memo(({ queryText, setQueryText }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <AntDesign color={Colors.secondary} name="search1" size={24} />
      </View>
      <TextInput
        placeholder="Хайх"
        style={styles.input}
        value={queryText}
        onSubmitEditing={() => setQueryText(queryText)}
        onChangeText={(value) => setQueryText(value)}
        returnKeyType="search"
        selectTextOnFocus={true}
        keyboardType="number-pad"
      />

      {queryText && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeIcon}
          onPress={() => {
            setQueryText("");
          }}
        >
          <AntDesign color={Colors.secondary} size={24} name="close" />
        </TouchableOpacity>
      )}
    </View>
  );
});

SearchField.displayName = "SearchField";

export { SearchField };

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    borderColor: Colors.secondary,
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 8,
    bottom: 0,
    justifyContent: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 8,
    bottom: 0,
    justifyContent: "center",
  },
});
