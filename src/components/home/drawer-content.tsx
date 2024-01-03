import { StyleSheet,  TouchableOpacity,  View } from "react-native";
import React, { memo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { BoldText, SemiBoldText } from "../common/styled-text";
import useSWR from "swr";
import { Colors } from "../../constants/colors";
import { IUser } from "../../interface/user";
import { AntDesign,MaterialCommunityIcons  } from "@expo/vector-icons";
import { DrawerCards } from "./drawer-cards";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
import { AuthApi } from "../../api";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import { useToast } from "react-native-toast-notifications";
const DrawerContent = memo(() => {
  const { data } = useSWR<IUser>("swr.user.me");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const onLogout = useCallback(async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err: any) {
      toast.show("Алдаа гарлаа", {
        type: "error",
        data: {
          title: err?.error?.message || "Алдаа гарлаа",
        },
        duration : 2000,
        placement: "top",
      });
    }
  }, [dispatch, toast]);
    return (
      <SafeAreaView style={styles.root}>
        <View>
          <View style={styles.userContainer}>
            <Image source={require("../../assets/img/Avatar.png")} style={styles.avatar}  />
            <View style={styles.userInfoContainer}>
              <BoldText numberOfLines={2} style={styles.name}>{`${data?.lastName} ${data?.firstName}`}</BoldText>
              <SemiBoldText style={styles.phone}>{data?.phone} ⭒ {data?.point} пойнт</SemiBoldText>
            </View>
          </View>
          <DrawerCards icon={<AntDesign color={Colors.primaryText} name="user" size={24}  />} title={"Бүртгэл шинэчлэх"}  />
          <DrawerCards icon={<AntDesign color={Colors.primaryText} name="phone" size={24}  />} title={"Холбоо барих"}  />
          <DrawerCards icon={<AntDesign color={Colors.primaryText} name="mail" size={24}  />} title={"Мэдэгдэл"}  />
        </View>
        <View>
          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <AntDesign color={Colors.primaryText} name="facebook-square" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign color={Colors.primaryText} name="instagram" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign color={Colors.primaryText} name="twitter" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign color={Colors.primaryText} name="linkedin-square" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider}  />
          <DrawerCards icon={<MaterialCommunityIcons color={Colors.primaryText} name="exit-run" size={24} />} onPress={onLogout} title={"Гарах"}  />
          <View style={styles.h8} />
        </View>
      </SafeAreaView>
    );
  });

  DrawerContent.displayName="DrawerContent";
  
export { DrawerContent };

const styles = StyleSheet.create({
    root: {
        marginTop     : 24,
        flex          : 1,
        justifyContent: "space-between"
    },
    avatar: {
        width       : 48,
        height      : 48,
        borderRadius: 48
    },
    userContainer: {
        flexDirection   : "row",
        alignItems      : "center",
        marginBottom    : 24,
        marginHorizontal: 24
    },
    name: {
      fontSize: 15,
      color   : Colors.primary
    },
    userInfoContainer: {
      marginLeft: 12,
      width     : "80%",
     
    },
    phone: {
      fontSize : 12,
      color    : Colors.primary,
      marginTop: 2
    },
    divider: {
      borderWidth: 1,
      borderColor: Colors.border
    },
    h8: {
      height: 8
    },
    socialContainer: {
      flexDirection   : "row",
      justifyContent  : "space-around",
      marginBottom    : 8,
      marginHorizontal: 12
    }
});