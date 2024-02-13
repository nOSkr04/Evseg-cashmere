import {  Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { FontAwesome5,MaterialCommunityIcons,MaterialIcons  } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { MediumText  } from "../common/styled-text";
import { UseFormResetField } from "react-hook-form";
import { ISignUpForm } from "../auth/sign-up-form";
type Props = {
  onChange: (...event: any[]) => void;
  closeUserTypeModal: () => void;
  resetField: UseFormResetField<ISignUpForm>
};

const width = Dimensions.get("window").width;

const UserTypeSheet = memo(({ onChange, closeUserTypeModal,resetField }: Props) => {
  const onSelected = useCallback((type: string) => {
        onChange(type);
        closeUserTypeModal();
        resetField("bankName");
        resetField("bankName.logo");
        resetField("bankName.name");
        resetField("bankNumber");
        resetField("nationalId");
        resetField("nationalId1");
        resetField("nationalId2");
  },[closeUserTypeModal, onChange, resetField]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelected("user")} style={styles.contentContainer}>
        <FontAwesome5 color={Colors.primaryText} name="user" size={24} />
        <MediumText style={styles.title}>Хэрэглэгч</MediumText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelected("guide")} style={styles.contentContainer}>
        <MaterialIcons  color={Colors.primaryText} name="supervised-user-circle" size={24} />
        <MediumText style={styles.title}>Хөтөч</MediumText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelected("driver")} style={styles.contentContainer}>
        <MaterialCommunityIcons color={Colors.primaryText} name="bus-marker" size={24} />
        <MediumText style={styles.title}>Жолооч</MediumText>
      </TouchableOpacity>
    </View>
  );
});

UserTypeSheet.displayName = "UserTypeSheet";

export { UserTypeSheet };

const styles = StyleSheet.create({
  container: {
    flexDirection : "row",
    justifyContent: "space-around",    
    width
  },
  contentContainer: {
    borderWidth    : 1,
    borderColor    : Colors.grey,
    alignItems     : "center",
    padding        : 10,
    width          : width / 3- 10,
    borderRadius   : 12,
    paddingVertical: 24
  },
  title: {
    fontSize : 14,
    marginTop: 8
  }
});
