import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "./types";

import { HomeScreen } from "../screens/home/home";
import useCachedResources from "../hooks/cache-resources";
import useSWR from "swr";
import { UserApi } from "../api";
import { useDispatch } from "react-redux";
import { authMe } from "../store/auth-slice";

const Stack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen } = Stack;

const RootStackNavigator = () => {
  const dispatch = useDispatch();
  const isLoadingComplete = useCachedResources();

  const { isLoading } = useSWR(
    "swr.user.me",
    async() => {
      const res = await UserApi.me();
      return res;
    },
    {
      onSuccess: authData => {
        dispatch(authMe(authData));
      }
    }
  );
  const navigationOptions = () => {
    return { headerShown: false };
  };

  if(!isLoadingComplete || isLoading){
    return null;
  }
  return (
    <Navigator
      initialRouteName={NavigationRoutes.HomeScreen}
      screenOptions={navigationOptions}
    >
      <Screen component={HomeScreen} name={NavigationRoutes.HomeScreen} />
    </Navigator>
  );
};

export { RootStackNavigator };
