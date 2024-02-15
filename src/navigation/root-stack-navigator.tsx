import React  from "react";
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
import { PointAccessScreen } from "../screens/home/point-access";
import { GivePointScreen } from "../screens/home/give-point";
import { PointMinusScreen } from "../screens/home/point-minus";
import { MinusPointScreen } from "../screens/home/minus-point";
import { SearchUserScreen } from "../screens/operator/search-user";
import { OperatorScreen } from "../screens/operator/operator";

const Stack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen, Group } = Stack;

const RootStackNavigator = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: { auth: IAuth }) => state.auth);

  const { isInitialLoading } = useSWRToken(
    "swr.auth.me",
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
        <Group>
          <Screen component={LoginScreen} name={NavigationRoutes.LoginScreen} />
          <Screen
            component={SignUpScreen}
            name={NavigationRoutes.SignUpScreen}
          />
        </Group>
      ) : (
        <>
          {user.role !== "user" ? (
            <Group>
              <Screen
                component={OperatorScreen}
                name={NavigationRoutes.OperatorScreen}
              />
              <Screen
                component={SearchUserScreen}
                name={NavigationRoutes.SearchUserScreen}
              />
              <Screen
                component={PointAccessScreen}
                name={NavigationRoutes.PointAccessScreen}
              />
              <Screen
                component={GivePointScreen}
                name={NavigationRoutes.GivePointScreen}
              />
              <Screen
                component={PointMinusScreen}
                name={NavigationRoutes.PointMinusScreen}
              />
              <Screen
                component={MinusPointScreen}
                name={NavigationRoutes.MinusPointScreen}
              />
            </Group>
          ) : (
            <Group>
              <Screen
                component={HomeScreen}
                name={NavigationRoutes.HomeScreen}
              />
              <Screen
                component={QrLightBox}
                name={NavigationRoutes.QrLightBox}
              />
            </Group>
          )}
        </>
      )}
    </Navigator>
  );
};

export { RootStackNavigator };
