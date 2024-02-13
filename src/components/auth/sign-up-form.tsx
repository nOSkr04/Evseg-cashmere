import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { Colors } from "../../constants/colors";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import { BoldText, MediumText, RegularText } from "../common/styled-text";
import Animated from "react-native-reanimated";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SheetBackdrop } from "../sheets/back-drop";
import { UserTypeSheet } from "../sheets/user-type";
import { NationalTypeGraphySheet } from "../sheets/national-typography";
import { BanksSheet } from "../sheets/banks";
import { Image } from "expo-image";

export type ISignUpForm = {
  firstName: string;
  lastName: string;
  nationalId: string;
  nationalId1: string;
  nationalId2: string;
  userType: "admin" | "operator" | "driver" | "user" | "guide";
  phone: string;
  password: string;
  cPassword: string;
  bankName: {
    logo: string;
    name: string;
  };
  bankNumber: string;
};

type Props = {
  control: Control<ISignUpForm, any>;
  errors: FieldErrors<ISignUpForm>;
  onSubmit: any;
  loading: boolean;
  watch: UseFormWatch<ISignUpForm>;
  resetField: UseFormResetField<ISignUpForm>
};

const width = Dimensions.get("screen").width;

const SignUpForm = memo(
  ({ control, errors, onSubmit, loading, watch,resetField }: Props) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bankBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const nationalSheetModalRef = useRef<BottomSheetModal>(null);
    const nationalSheetModalRef1 = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => [150], []);
    const nationalSnapPoints = useMemo(() => [550], []);
    const nationalSnapPoints1 = useMemo(() => [550], []);
    const bankSnapPoints = useMemo(() => [500], []);

    const [snapIndex, setSnapIndex] = useState(-1);
    const [bankSnapIndex, setBankSnapIndex] = useState(-1);
    const [nationalIndex, setNationalIndex] = useState(-1);
    const [nationalIndex1, setNationalIndex1] = useState(-1);

    const changeUserTypeModal = useCallback(() => {
      bottomSheetModalRef.current?.present();
      setSnapIndex(0);
    }, []);
    const nationalModal = useCallback(() => {
      nationalSheetModalRef.current?.present();
      setNationalIndex(0);
    }, []);
    const nationalModal1 = useCallback(() => {
      nationalSheetModalRef1.current?.present();
      setNationalIndex1(0);
    }, []);
    const bankModal = useCallback(() => {
      bankBottomSheetModalRef.current?.present();
      setBankSnapIndex(0);
    }, []);

    const closeUserTypeModal = useCallback(() => {
      bottomSheetModalRef.current?.close();
      setSnapIndex(-1);
    }, []);
    const closeBankModal = useCallback(() => {
      bankBottomSheetModalRef.current?.close();
      setBankSnapIndex(-1);
    }, []);
    const closeNationalModal = useCallback(() => {
      nationalSheetModalRef.current?.close();
      setNationalIndex(-1);
    }, []);
    const closeNationalModal1 = useCallback(() => {
      nationalSheetModalRef1.current?.close();
      setNationalIndex1(-1);
    }, []);

    return (
      <>
        <Animated.View style={styles.container}>
          {/* firstname */}
          <>
            <MediumText style={styles.title}>Нэр</MediumText>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Нэр"
                  placeholderTextColor={Colors.grey}
                  style={styles.input}
                  value={value}
                />
              )}
              rules={{ required: "Заавал оруулна уу" }}
            />
            {errors.firstName && (
              <RegularText style={styles.errorText}>
                {errors.firstName.message}
              </RegularText>
            )}
          </>
          {/* lastname */}
          <>
            <MediumText style={styles.title}>Овог</MediumText>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Овог"
                  placeholderTextColor={Colors.grey}
                  style={styles.input}
                  value={value}
                />
              )}
              rules={{ required: "Заавал оруулна уу" }}
            />
            {errors.lastName && (
              <RegularText style={styles.errorText}>
                {errors.lastName.message}
              </RegularText>
            )}
          </>
          {/* phone */}
          <>
            <MediumText style={styles.title}>Утас</MediumText>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Утас"
                  placeholderTextColor={Colors.grey}
                  style={styles.input}
                  value={value}
                />
              )}
              rules={{ required: "Заавал оруулна уу" }}
            />
            {errors.phone && (
              <RegularText style={styles.errorText}>
                {errors.phone.message}
              </RegularText>
            )}
          </>
          {/* userType */}
          <>
            <MediumText style={styles.title}>Хэрэглэгчийн төрөл</MediumText>
            <Controller
              control={control}
              name="userType"
              render={({ field: { onChange, value = "Сонгоно уу" } }) => {
                return (
                  <>
                    <Pressable
                      onPress={changeUserTypeModal}
                      style={styles.userTypeContainer}
                    >
                      <MediumText
                        style={
                          value !== "Сонгоно уу"
                            ? styles.selected
                            : styles.unselected
                        }
                      >
                        {value === "guide"
                          ? "Хөтөч"
                          : value === "user"
                            ? "Хэрэглэгч"
                            : value === "driver"
                              ? "Жолооч"
                              : value}
                      </MediumText>
                    </Pressable>
                    <BottomSheetModal
                      backdropComponent={SheetBackdrop}
                      enableDismissOnClose={true}
                      enablePanDownToClose
                      index={snapIndex}
                      onChange={changeUserTypeModal}
                      onDismiss={closeUserTypeModal}
                      ref={bottomSheetModalRef}
                      snapPoints={snapPoints}
                    >
                      <UserTypeSheet
                        closeUserTypeModal={closeUserTypeModal}
                        onChange={onChange}
                        resetField={resetField}
                      />
                    </BottomSheetModal>
                  </>
                );
              }}
              rules={{ required: "Заавал оруулна уу" }}
            />
            {errors.userType && (
              <RegularText style={styles.errorText}>
                {errors.userType.message}
              </RegularText>
            )}
          </>
          {/* national id */}
          {watch("userType") !== "user" && (
            <>
              <MediumText style={styles.title}>Регистрийн дугаар</MediumText>
              <Controller
                control={control}
                name="nationalId"
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <>
                      <View style={styles.nationalContainer}>
                        <Controller
                          control={control}
                          name="nationalId1"
                          render={({ field: { onChange, value = "Э" } }) => {
                            return (
                              <>
                                <TouchableOpacity
                                  onPress={nationalModal}
                                  style={styles.nationalTextContainer}
                                >
                                  <MediumText style={styles.nationalText}>
                                    {value}
                                  </MediumText>
                                </TouchableOpacity>
                                <BottomSheetModal
                                  backdropComponent={SheetBackdrop}
                                  enableDismissOnClose={true}
                                  enablePanDownToClose
                                  index={nationalIndex}
                                  onChange={nationalModal}
                                  onDismiss={closeNationalModal}
                                  ref={nationalSheetModalRef}
                                  snapPoints={nationalSnapPoints}
                                >
                                  <NationalTypeGraphySheet
                                    closeUserTypeModal={closeNationalModal}
                                    onChange={onChange}
                                  />
                                </BottomSheetModal>
                              </>
                            );
                          }}
                          rules={{
                            required: {
                              value:
                                watch("userType") !== "user" ? false : true,
                              message: "Заавал оруулна уу",
                            },
                          }}
                        />
                        <Controller
                          control={control}
                          name="nationalId2"
                          render={({ field: { onChange, value = "Э" } }) => {
                            return (
                              <>
                                <TouchableOpacity
                                  onPress={nationalModal1}
                                  style={styles.nationalTextContainer}
                                >
                                  <MediumText style={styles.nationalText}>
                                    {value}
                                  </MediumText>
                                </TouchableOpacity>
                                <BottomSheetModal
                                  backdropComponent={SheetBackdrop}
                                  enableDismissOnClose={true}
                                  enablePanDownToClose
                                  index={nationalIndex1}
                                  onChange={nationalModal1}
                                  onDismiss={closeNationalModal1}
                                  ref={nationalSheetModalRef1}
                                  snapPoints={nationalSnapPoints1}
                                >
                                  <NationalTypeGraphySheet
                                    closeUserTypeModal={closeNationalModal1}
                                    onChange={onChange}
                                  />
                                </BottomSheetModal>
                              </>
                            );
                          }}
                          rules={{
                            required: {
                              value:
                                watch("userType") !== "user" ? false : true,
                              message: "Заавал оруулна уу",
                            },
                          }}
                        />
                        <TextInput
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          placeholder="Регистрийн дугаар"
                          placeholderTextColor={Colors.grey}
                          style={styles.nationalInput}
                          value={value}
                        />
                      </View>
                    </>
                  );
                }}
                rules={{
                  required: {
                    value  : watch("userType") !== "user" ? false : true,
                    message: "Заавал оруулна уу",
                  },
                }}
              />
              {errors.nationalId && (
                <RegularText style={styles.errorText}>
                  {errors.nationalId.message}
                </RegularText>
              )}
            </>
          )}
          {/* banks */}
          {watch("userType") !== "user" && (
            <>
              <MediumText style={styles.title}>Банк</MediumText>
              <Controller
                control={control}
                name="bankNumber"
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <>
                      <View style={styles.nationalContainer}>
                        <Controller
                          control={control}
                          name="bankName"
                          render={({
                            field: {
                              onChange,
                              value = {
                                name: "?",
                                logo: "",
                              },
                            },
                          }) => {
                            return (
                              <>
                                <TouchableOpacity
                                  onPress={bankModal}
                                  style={styles.bankContainer}
                                >
                                  {value.logo ? (
                                    <Image
                                      source={value.logo}
                                      style={styles.bankContainer}
                                    />
                                  ) : (
                                    <MediumText style={styles.nationalText}>
                                      {value?.name}
                                    </MediumText>
                                  )}
                                </TouchableOpacity>
                                <BottomSheetModal
                                  backdropComponent={SheetBackdrop}
                                  enableDismissOnClose={true}
                                  enablePanDownToClose
                                  index={bankSnapIndex}
                                  onChange={bankModal}
                                  onDismiss={closeBankModal}
                                  ref={bankBottomSheetModalRef}
                                  snapPoints={bankSnapPoints}
                                >
                                  <BanksSheet
                                    closeUserTypeModal={closeBankModal}
                                    onChange={onChange}
                                  />
                                </BottomSheetModal>
                              </>
                            );
                          }}
                          rules={{
                            required: {
                              value:
                                watch("userType") !== "user" ? false : true,
                              message: "Заавал оруулна уу",
                            },
                          }}
                        />
                        <View style={styles.w6}  />
                        <TextInput
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          placeholder="Дансны дугаар"
                          placeholderTextColor={Colors.grey}
                          style={styles.bankInput}
                          value={value}
                        />
                      </View>
                    </>
                  );
                }}
                rules={{
                  required: {
                    value  : watch("userType") !== "user" ? false : true,
                    message: "Заавал оруулна уу",
                  },
                }}
              />
              {errors.nationalId && (
                <RegularText style={styles.errorText}>
                  {errors.nationalId.message}
                </RegularText>
              )}
            </>
          )}
          {/* password */}
          <>
            <MediumText style={styles.title}>Нууц үг</MediumText>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Нууц үг"
                  placeholderTextColor={Colors.grey}
                  secureTextEntry
                  style={styles.input}
                  value={value}
                />
              )}
              rules={{ required: "Заавал оруулна уу" }}
            />
            {errors.password && (
              <RegularText style={styles.errorText}>
                {errors.password.message}
              </RegularText>
            )}
          </>
          {/* cPassword */}
          <>
            <MediumText style={styles.title}>Нууц үг давтана уу</MediumText>
            <Controller
              control={control}
              name="cPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Нууц үг давтана уу"
                  placeholderTextColor={Colors.grey}
                  secureTextEntry
                  style={styles.input}
                  value={value}
                />
              )}
              rules={{ required: "Заавал оруулна уу",  validate: (value) => value === watch("password") || "Нууц үг таарсангүй" }}
            />
            {errors.cPassword && (
              <RegularText style={styles.errorText}>
                {errors.cPassword.message}
              </RegularText>
            )}
          </>
          <View style={styles.mt24} />
          <View>
            <TouchableOpacity onPress={onSubmit} style={styles.loginContainer}>
              {loading ? (
                <ActivityIndicator color={Colors.primary} size={"large"} />
              ) : (
                <BoldText style={styles.loginText}>Бүртгүүлэх</BoldText>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    );
  }
);

SignUpForm.displayName = "SignUpForm";

export { SignUpForm };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal   : 16,
    paddingTop          : 20,
    backgroundColor     : Colors.white,
    borderTopLeftRadius : 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderRadius   : 10,
    marginBottom   : 10,
    backgroundColor: Colors.lightGrey,
    height         : 50,
    paddingLeft    : 10,
    fontFamily     : "NunMedium",
    color          : Colors.primaryText,
  },
  title: {
    marginBottom: 8,
    color       : Colors.black,
  },

  errorText: {
    color      : Colors.danger,
    fontSize   : 12,
    textAlign  : "right",
    marginRight: 16,
  },
  loginText: {
    color: Colors.white,
  },
  mt24: {
    marginTop: 24,
  },
  loginContainer: {
    backgroundColor: Colors.secondary,
    borderRadius   : 10,
    paddingVertical: 12,
    justifyContent : "center",
    alignItems     : "center",
    marginBottom   : 24,
  },
  userTypeContainer: {
    backgroundColor: Colors.lightGrey,
    height         : 50,
    justifyContent : "center",
    marginBottom   : 10,
    borderRadius   : 10,
    paddingLeft    : 10,
  },
  unselected: {
    color: Colors.grey,
  },
  selected: {
    color: Colors.primaryText,
  },
  nationalContainer: {
    flexDirection: "row",
    alignItems   : "center",
    marginBottom : 10,
  },
  nationalInput: {
    borderRadius   : 10,
    backgroundColor: Colors.lightGrey,
    height         : 50,
    paddingLeft    : 10,
    fontFamily     : "NunMedium",
    color          : Colors.primaryText,
    width          : width - 145,
  },
  nationalTextContainer: {
    width          : 50,
    height         : 50,
    backgroundColor: Colors.lightGrey,
    alignItems     : "center",
    justifyContent : "center",
    marginRight    : 6,
    borderRadius   : 10,
  },
  nationalText: {
    fontSize: 14,
    color   : Colors.primaryText,
  },
  bankInput: {
    borderRadius   : 10,
    backgroundColor: Colors.lightGrey,
    height         : 50,
    paddingLeft    : 10,
    fontFamily     : "NunMedium",
    color          : Colors.primaryText,
    width          : width - 90,
  },
  bankContainer: {
    width          : 50,
    height         : 50,
    backgroundColor: Colors.lightGrey,
    alignItems     : "center",
    justifyContent : "center",
    borderRadius   : 10,
  },
  w6: {
    width: 6
  }
});
