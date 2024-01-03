import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "./types";

import { HomeScreen } from "../screens/home/home";
import { UserApi } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { authMe } from "../store/auth-slice";
import { SignUpScreen } from "../screens/auth/sign-up";
import { LoginScreen } from "../screens/auth/login";
import { IAuth } from "../interface/auth";
import { useSWRToken } from "../hooks/use-swr-token";
import { QrLightBox } from "../screens/home/qr-light-box";

const Stack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen } = Stack;

const RootStackNavigator = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: { auth: IAuth }) => state.auth);

  const { isInitialLoading,  } = useSWRToken(
    "swr.user.me",
    async () => {
      return await UserApi.me();
    },
    {
      onSuccess: (authData) => {
        dispatch(authMe(authData));
      },
    }
  );

  if (isInitialLoading) {
    return null;
  }

  return (
    <Navigator
      initialRouteName={NavigationRoutes.LoginScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <>
          <Screen component={LoginScreen} name={NavigationRoutes.LoginScreen} />
          <Screen
            component={SignUpScreen}
            name={NavigationRoutes.SignUpScreen}
          />
        </>
      ) : (
        <>
          <Screen component={HomeScreen} name={NavigationRoutes.HomeScreen} />
          <Screen component={QrLightBox} name={NavigationRoutes.QrLightBox} />
        </>
      )}
    </Navigator>
  );
};

export { RootStackNavigator };
