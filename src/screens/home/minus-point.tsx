import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/types";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../components/common/styled-text";
import { Colors } from "../../constants/colors";
import { Controller, useForm } from "react-hook-form";
import { UserApi } from "../../api";
import { NormalBar } from "../../components/app-bar/normal-bar";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.MinusPointScreen
>;

type form = {
  point: string;
  minusMoney: string;
};

const MinusPointScreen = memo(({ route }: Props) => {
  const { user } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<form>();

  const onSubmit = async (data: form) => {
    setLoading(true);
    if(user.point < Number(data.point)){
      setLoading(false);
      return Alert.alert("Пойнт үлдэгдэл хүрэлцэхгүй байна");
    }
    try {
      const createdData = {
        point     : data.point,
        clientId  : user._id,
        minusPoint: data.minusMoney
      };
      await UserApi.minusPoint(createdData);
      navigation.navigate(NavigationRoutes.HomeScreen);
      Alert.alert(`${user.firstName}-aac амжилттай ${data.point} хасагдлаа`);
    } catch (err: any) {
      if (err.statusCode === 404) {
        setError("point", {
          message: "Серверт алдаа гарсан байна та түр хүлээнэ үү",
        });
        return;
      }
      setError("point", {
        message: err.error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NormalBar/>
      <View style={styles.root}>
        <BoldText style={styles.title}>
          {user?.lastName} {user?.firstName}
        </BoldText>
        <BoldText style={styles.title2}>
          Боломжит пойнт: {user?.point} point
        </BoldText>
        <View style={styles.divider}  />
        <MediumText style={styles.title1}>Худалдан авалтын дүн</MediumText>
        <Controller
        control={control}
        name="minusMoney"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType="number-pad"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            placeholder="Худалдан авалтын дүн"
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "Заавал оруулна уу" }}
      />
        {errors.minusMoney && (
          <RegularText style={styles.errorText}>
            {errors.minusMoney?.message}
          </RegularText>
      )}
        <MediumText style={styles.title1}>Хасах пойнт</MediumText>
        <Controller
        control={control}
        name="point"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType="number-pad"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            placeholder="Хасах пойнт"
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "Заавал оруулна уу" }}
      />
        {errors.point && (
          <RegularText style={styles.errorText}>
            {errors.point?.message}
          </RegularText>
      )}
        <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.loginContainer}
      >
          {loading ? (
            <ActivityIndicator color={Colors.primary} size={"large"} />
        ) : (
          <BoldText style={styles.loginText}>Батлах</BoldText>
        )}
        </TouchableOpacity>
      </View>
    </>
  );
});

MinusPointScreen.displayName = "MinusPointScreen";

export { MinusPointScreen };

const styles = StyleSheet.create({
  root: {
    flex             : 1,
    backgroundColor  : Colors.white,
    paddingHorizontal: 24
  },
  title: {
    fontSize : 24,
    color    : Colors.black,
    textAlign: "center"
  },
  input: {
    borderRadius   : 10,
    marginBottom   : 10,
    backgroundColor: Colors.lightGrey,
    height         : 50,
    paddingLeft    : 10,
  },
  title1: {
    marginBottom: 8,
    color       : Colors.black,
  },
  title2: {
    marginBottom: 8,
    color       : Colors.primary,
    fontSize    : 12,
    textAlign   : "center"
  },
  errorText: {
    color       : Colors.danger,
    fontSize    : 12,
    marginBottom: 5,
    textAlign   : "right",
    marginRight : 16,
  },
  loginContainer: {
    backgroundColor: Colors.secondary,
    borderRadius   : 10,
    paddingVertical: 12,
    justifyContent : "center",
    alignItems     : "center",
    marginBottom   : 24,
  },
  loginText: {
    color: Colors.white,
  },
  divider: {
    borderWidth   : 1,
    borderColor   : Colors.black,
    borderStyle   : "dashed",
    marginVertical: 16
  }
});
