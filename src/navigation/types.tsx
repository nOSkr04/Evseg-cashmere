/* eslint-disable no-unused-vars */
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum NavigationRoutes {
HomeScreen = "HomeScreen",
LoginScreen = "LoginScreen"
}

export type RootStackParamList = {
  HomeScreen: undefined
  LoginScreen: undefined
};

// export type BottomTabParamList = {
//   HomeTab: undefined;
//   ReelTab: undefined;
//   ChatTab: undefined;
//   BasketTab: undefined;
//   ProfileTab: undefined;
//   OtpVerifyTab: undefined;
//   UserProfileTab: undefined;
// };


export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
// export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  // NativeStackScreenProps<BottomTabParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
