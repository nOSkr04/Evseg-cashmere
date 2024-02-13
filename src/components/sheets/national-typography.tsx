import {  Dimensions, FlatList, StyleSheet, TouchableOpacity,  } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors } from "../../constants/colors";
import { MediumText  } from "../common/styled-text";
type Props = {
  onChange: (...event: any[]) => void;
  closeUserTypeModal: () => void;
};

const width = Dimensions.get("window").width;

const NationalTypeGraphySheet = memo(({ onChange, closeUserTypeModal }: Props) => {
  const mongoliaTypographys = [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ё",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "Ө",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ү",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ъ",
    "Ь",
    "Ы",
    "Э",
    "Ю",
    "Я",
  ];
  const onSelected = useCallback(
    (type: string) => {
      onChange(type);
      closeUserTypeModal();
    },
    [closeUserTypeModal, onChange]
  );
  return (
    <FlatList
      columnWrapperStyle={styles.columnStyle}
      
      data={mongoliaTypographys}
      keyExtractor={(item) => item}
      numColumns={5}
      renderItem={({ item }: { item: string }) => {
        return (
          <TouchableOpacity onPress={() => onSelected(item)} style={styles.contentContainer}>
            <MediumText style={styles.title}>{item}</MediumText>
          </TouchableOpacity>
        );
      }}
      style={styles.container}
    />
  );
});

NationalTypeGraphySheet.displayName = "NationalTypeGraphySheet";

export { NationalTypeGraphySheet };

const styles = StyleSheet.create({
  container: {
  flex: 1
  },
  contentContainer: {
    width         : width /5 - 16,
    height        : width /5  - 16,
    borderWidth   : 1,
    alignItems    : "center",
    justifyContent: "center",
    borderRadius  : 8,
    borderColor   : Colors.grey
  },
  columnStyle: {
    marginHorizontal: 24,
    marginVertical  : 5,
    justifyContent  : "space-between"
  },
  title: {
    fontSize: 12,
    color   : Colors.primaryText
  }
  
});
