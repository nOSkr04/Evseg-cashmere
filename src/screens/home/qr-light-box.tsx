import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { LightBox } from "../../components/animate/light-box";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import QRCode from "react-native-qrcode-svg";
import { Colors } from "../../constants/colors";
import { IUser } from "../../interface/user";
import useSWR from "swr";
import { AntDesign } from "@expo/vector-icons";
import { SemiBoldText } from "../../components/common/styled-text";

const { width } = Dimensions.get("window");

const QrLightBox = memo(() => {
  const navigation = useNavigation();
  const { data } = useSWR<IUser>("swr.user.me");
  return (
    <LightBox
      LightHeaderComponent={
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backContainer}
          >
            <AntDesign color={Colors.white} name="arrowleft" size={24} />
          </Pressable>
          <SemiBoldText style={styles.title}>QR УНШУУЛАХ</SemiBoldText>
          <Pressable style={styles.backContainer2}>
            <AntDesign color={Colors.secondary} name="arrowleft" size={24} />
          </Pressable>
        </View>
      }
      onClosed={() => navigation.goBack()}
    >
      <Animated.View sharedTransitionTag="userQrCode">
        <QRCode
          logoBackgroundColor={Colors.white}
          size={320}
          value={data?._id}
        />
      </Animated.View>
    </LightBox>
  );
});

QrLightBox.displayName = "QrLightBox";

export { QrLightBox };

const styles = StyleSheet.create({
  qrCode: {
    width: width * 0.9,
    alignSelf: "center",
    height: 400,
    marginVertical: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width,
    marginHorizontal: 16,
  },
  backContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
  },
  backContainer2: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: Colors.white,
  },
});
