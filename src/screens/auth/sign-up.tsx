import { Dimensions, KeyboardAvoidingView, Platform,  StyleSheet, TouchableOpacity, View, } from "react-native";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { authLogin } from "../../store/auth-slice";
import { AuthApi } from "../../api";
import { Colors } from "../../constants/colors";
import { AuthLogo } from "../../components/common/auth-logo";
import { ISignUpForm, SignUpForm } from "../../components/auth/sign-up-form";
import Animated, { FadeInDown, FadeInUp, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue,  withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { BoldText } from "../../components/common/styled-text";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;

const SignUpScreen = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const shared = useSharedValue(0);
  const changeColor = useSharedValue(0);
  const sf = useSafeAreaInsets();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    shared.value = event.contentOffset.y;
    if(event.contentOffset.y >= 115){
      changeColor.value = withTiming(1);
    } else {
      changeColor.value = withTiming(0);
    }
  });
  
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    watch,
    resetField
  } = useForm<ISignUpForm>();

  const onSubmit = async (data: ISignUpForm) => {

    const createUser = {
      phone    : data.phone,
      firstName: data.firstName,
      lastName : data.lastName,
      userType : data.userType,
      password : data.password,
      role     : "user"
    };    
    
    const createDriver = {
      phone     : data.phone,
      firstName : data.firstName,
      lastName  : data.lastName,
      userType  : data.userType,
      password  : data.password,
      nationalId: `${data?.nationalId1}${data?.nationalId2}${data?.nationalId}`,
      bankName  : data.bankName?.name,
      bankNumber: data.bankNumber,
      role      : "user"
    };
  
    setLoading(true);
    try {
      const res = await AuthApi.signUp(data.userType === "user" ? createUser : createDriver);
      dispatch(authLogin(res));
    } catch (err: any) {
      if (err.statusCode === 404) {
        setError("root", {
          message: "Серверт алдаа гарсан байна та түр хүлээнэ үү"
        });
        return;
      }
      setError("cPassword", {
        message: err.error.message
      });
    } finally{
      setLoading(false);
    }
  };
  const translateY = {
    transform: [
      {
        translateY: shared,
      },
    ],
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop     : sf.top + 10,
      backgroundColor: interpolateColor(
        changeColor.value,
        [0, 1],
        ["transparent", "white"]
      ),
    };
  });

  const animatedTitle = useAnimatedStyle(() => {
    return{
      opacity : withTiming(changeColor.value, { duration: 100 }),
      fontSize: 16,
    };
  });

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
        <Animated.View style={[animatedStyle,styles.header]}>
          <TouchableOpacity onPress={() => {
             navigation.goBack();
          }}>
            <AntDesign color={Colors.black} name="arrowleft" size={24}  />
          </TouchableOpacity>
          <BoldText style={animatedTitle}>Бүртгүүлэх</BoldText>
          <View>
            <AntDesign color={Colors.transparent} name="arrowleft" size={24} />
          </View>
        </Animated.View>
        <Animated.ScrollView onScroll={scrollHandler} showsVerticalScrollIndicator={false} style={styles.container}>
          <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} style={[styles.appbar,translateY]}>
            <AuthLogo/>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
            <SignUpForm control={control} errors={errors} loading={loading} onSubmit={handleSubmit(onSubmit)} resetField={resetField} watch={watch} />
          </Animated.View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    );
  });

  SignUpScreen.displayName="SignUpScreen";

export { SignUpScreen };

const styles = StyleSheet.create({
  header: {
    position         : "absolute",
    left             : 0,
    right            : 0,
    zIndex           : 2,
    width,
    paddingBottom    : 10,
    paddingHorizontal: 16,
    flexDirection    : "row",
    alignItems       : "center",
    justifyContent   : "space-between"
  },
  root: {
    flex: 1,
  },
  container: {
    flex           : 1,
    backgroundColor: Colors.white
  },
  appbar: {
    height         : 200,
    backgroundColor: Colors.secondary
  }
});