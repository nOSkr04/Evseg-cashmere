import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "./types";

import { OperatorScreen } from "../screens/home/operator";
import { UserApi } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { authMe } from "../store/auth-slice";
import { SignUpScreen } from "../screens/auth/sign-up";
import { LoginScreen } from "../screens/auth/login";
import { IAuth } from "../interface/auth";
import { useSWRToken } from "../hooks/use-swr-token";
import { QrLightBox } from "../screens/home/qr-light-box";
import { PointAccessScreen } from "../screens/home/point-access";
import { GivePointScreen } from "../screens/home/give-point";
import { PointMinusScreen } from "../screens/home/point-minus";
import { MinusPointScreen } from "../screens/home/minus-point";
import { UserSearchScreen } from "../screens/home/user-search";

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
          <Screen component={OperatorScreen} name={NavigationRoutes.OperatorScreen} />
          <Screen component={QrLightBox} name={NavigationRoutes.QrLightBox} />
          <Screen component={PointAccessScreen} name={NavigationRoutes.PointAccessScreen} />
          <Screen component={GivePointScreen} name={NavigationRoutes.GivePointScreen} />
          <Screen component={PointMinusScreen} name={NavigationRoutes.PointMinusScreen} />
          <Screen component={MinusPointScreen} name={NavigationRoutes.MinusPointScreen} />
          <Screen component={UserSearchScreen} name={NavigationRoutes.UserSearchScreen} />
        </>
      )}
    </Navigator>
  );
};

export { RootStackNavigator };
