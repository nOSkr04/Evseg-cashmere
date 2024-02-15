import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { authLogin } from "../../store/auth-slice";
import { AuthApi } from "../../api";
import { Colors } from "../../constants/colors";
import { AuthLogo } from "../../components/common/auth-logo";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { ILoginForm, LoginForm } from "../../components/auth/login-form";
import { usePushNotifications } from "../../hooks/use-notification";
const LoginScreen = memo(() => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const shared = useSharedValue(0);
  const { expoPushToken } = usePushNotifications();
  const scrollHandler = useAnimatedScrollHandler((event) => {
    shared.value = event.contentOffset.y;
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    setLoading(true);
    try {
      const createdData = {
        phone: data.phone,
        password: data.password,
        expoPushToken: expoPushToken?.data,
      };
      const res = await AuthApi.login(createdData);
      dispatch(authLogin(res));
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      if (err.statusCode === 404) {
        setError("phone", {
          message: "Серверт алдаа гарсан байна та түр хүлээнэ үү",
        });
        return;
      }
      setError("phone", {
        message: err.error.message,
      });
    } finally {
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      <Animated.ScrollView
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <Animated.View
          entering={FadeInUp.delay(200).duration(1000).springify()}
          style={[styles.header, translateY]}
        >
          <AuthLogo />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
        >
          <LoginForm
            control={control}
            errors={errors}
            loading={loading}
            onSubmit={handleSubmit(onSubmit)}
          />
        </Animated.View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
});

LoginScreen.displayName = "LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 200,
    backgroundColor: Colors.secondary,
  },
});
