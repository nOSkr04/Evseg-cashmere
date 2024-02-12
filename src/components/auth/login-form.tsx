import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/colors";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { BoldText, MediumText, RegularText, SemiBoldText,  } from "../common/styled-text";
import { NavigationRoutes } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";

export type ILoginForm = {
    phone: string;
    password: string;
    
  };
  
  type Props = {
    control: Control<ILoginForm, any>;
    errors: FieldErrors<ILoginForm>;
    onSubmit:any
    loading: boolean
  };

const LoginForm = memo(({ control, errors,onSubmit,loading }: Props) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <MediumText style={styles.title}>Утас</MediumText>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder="Нэвтрэх нэр"
              style={styles.input}
              value={value}
            />
          )}
          rules={{ required: "Заавал оруулна уу" }}
        />
        {errors.phone && (
          <RegularText style={styles.errorText}>{errors.phone.message}</RegularText>
        )}
        <View style={styles.h12}/>
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
              secureTextEntry
              style={styles.input}
              value={value}
            />
          )}
          rules={{ required: "Заавал оруулна уу" }}
        />
          {errors.password && (
            <RegularText style={styles.errorText}>{errors.password.message}</RegularText>
        )}
        </>
        <View style={styles.mt24} />
        <View >
          <TouchableOpacity
              onPress={onSubmit}
              style={styles.loginContainer}
            >
            {loading ?
              <ActivityIndicator color={Colors.primary} size={"large"}  /> 
              :
              <BoldText style={styles.loginText}>Нэвтрэх</BoldText>
              }
           
          </TouchableOpacity>
          <View style={styles.row}>
            <RegularText style={styles.registerText}>
              Бүртгэл байхгүй юу ?
            </RegularText>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.SignUpScreen)}>
              <SemiBoldText style={styles.registerButtonText}>  БҮРТГҮҮЛЭХ</SemiBoldText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  });

  LoginForm.displayName="LoginForm";

export { LoginForm };

const styles = StyleSheet.create({
    input: {
        borderRadius   : 10,
        marginBottom   : 10,
        backgroundColor: Colors.lightGrey,
        height         : 50,
        paddingLeft    : 10,
      },
      title: {
        marginBottom: 8,
        color       : Colors.black,
        
      },
      container: {
        paddingHorizontal: 16,
        paddingTop       : 20,
        backgroundColor  : Colors.white
      },
      errorText: {
        color       : Colors.danger,
        fontSize    : 12,
        marginBottom: 5,
        textAlign   : "right",
        marginRight : 16,
      },
      h12: {
        height: 12
      },
      loginText: {
        color: Colors.white,
      },
      loginContainer: {
        backgroundColor: Colors.secondary,
        borderRadius   : 10,
        paddingVertical: 12,
        justifyContent : "center",
        alignItems     : "center",
        marginBottom   : 24
      },
      mt24: {
        marginTop: 24,
      },
    
      row: {
        marginBottom  : 50,
        alignItems    : "center",
        justifyContent: "center",
        flexDirection : "row",
      },

      registerButtonText: {
        textAlign: "center",
        color    : Colors.black,
      },
      registerText: {
        textAlign     : "center",
        marginVertical: 10,
        color         : Colors.grey,
      },
});