/* eslint-disable no-unused-vars */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IUser } from "../interface/user";

export enum NavigationRoutes {
HomeScreen = "HomeScreen",
LoginScreen = "LoginScreen",
SignUpScreen = "SignUpScreen",
QrLightBox = "QrLightBox",
PointAccessScreen = "PointAccessScreen",
GivePointScreen = "GivePointScreen",
PointMinusScreen = "PointMinusScreen",
MinusPointScreen = "MinusPointScreen",
}

export type RootStackParamList = {
  HomeScreen: undefined
  LoginScreen: undefined
  SignUpScreen:undefined
  QrLightBox:undefined
  PointAccessScreen:undefined
  GivePointScreen:{user: IUser}
  PointMinusScreen:undefined
  MinusPointScreen:{user: IUser}
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
