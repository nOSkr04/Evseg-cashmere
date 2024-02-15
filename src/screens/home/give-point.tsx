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
import useSWRInfinite from "swr/infinite";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.GivePointScreen
>;

type form = {
  point: string;
};

const GivePointScreen = memo(({ route }: Props) => {
  const { user } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    watch,
  } = useForm<form>();

  const { mutate } = useSWRInfinite((index) => `swr.transaction.All.${index}`);

  const onSubmit = async (data: form) => {
    setLoading(true);
    try {
      const createdData = {
        point: data.point,
        clientId: user._id,
      };
      await UserApi.givePoint(createdData);
      navigation.navigate(NavigationRoutes.OperatorScreen);
      Alert.alert(`${user.firstName}-aac амжилттай ${data.point} илгээгдлээ`);
      setTimeout(() => {
        mutate();
      }, 500);
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
      <NormalBar />
      <View style={styles.root}>
        <BoldText style={styles.title}>
          {user?.lastName} {user?.firstName}
        </BoldText>
        <View style={styles.divider} />
        <MediumText style={styles.title1}>
          Худалдан авалтын дүн{" "}
          {watch("point") && `${Number(watch("point")).toLocaleString()} ₮`}{" "}
        </MediumText>
        <Controller
          control={control}
          name="point"
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

GivePointScreen.displayName = "GivePointScreen";

export { GivePointScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.lightGrey,
    height: 50,
    paddingLeft: 10,
  },
  title1: {
    marginBottom: 8,
    color: Colors.black,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: 5,
    textAlign: "right",
    marginRight: 16,
  },
  loginContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginText: {
    color: Colors.white,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: "dashed",
    marginVertical: 16,
  },
});
