import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import Animated, { SharedValue } from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { IUser } from "../../interface/user";
import { BoldText, MediumText } from "../common/styled-text";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

const ParallaxView = memo(
  ({
    shared,
    user,
    isLoading,
  }: {
    shared: SharedValue<number>;
    user?: IUser;
    isLoading: boolean;
  }) => {
    const navigation = useNavigation();
    const translateY = {
      transform: [
        {
          translateY: shared,
        },
      ],
    };
    return (
      <Animated.View style={[styles.container, translateY]}>
        {isLoading ? (
          <ActivityIndicator color={Colors.primary} size={"large"} />
        ) : (
          <View>
            <View style={styles.pointContainer}>
              <BoldText style={styles.pointTitle}>Таны э-пойнт: </BoldText>
              <MediumText style={styles.pointDescription}>
                {(user?.point || 0).toLocaleString()} пойнт
              </MediumText>
            </View>
            {user?.userType !== "user" && (
              <>
                <View style={styles.h12} />
                <View style={styles.pointContainer}>
                  <BoldText style={styles.pointTitle}>
                    Таны урамшуулал:{" "}
                  </BoldText>
                  <MediumText style={styles.pointDescription}>
                    {user?.money || 0} ₮
                  </MediumText>
                </View>
              </>
            )}
          </View>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationRoutes.QrLightBox)}
        >
          <Animated.View sharedTransitionTag="userQrCode">
            <QRCode
              logoBackgroundColor={Colors.white}
              size={90}
              value={user?._id}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

ParallaxView.displayName = "ParallaxView";

export { ParallaxView };

const styles = StyleSheet.create({
  container: {
    flexDirection    : "row",
    alignItems       : "center",
    justifyContent   : "space-between",
    backgroundColor  : Colors.secondary,
    height           : 140,
    paddingHorizontal: 24,
  },
  qrCode: {
    width : 90,
    height: 90,
  },
  pointContainer: {
    flexDirection: "row",
    alignItems   : "center",
  },
  pointTitle: {
    fontSize: 16,
    color   : Colors.primaryText,
  },
  pointDescription: {
    color   : Colors.primary,
    fontSize: 16,
  },
  h12: {
    height: 1,
  },
  button: {
    padding     : 12,
    borderWidth : 1,
    borderColor : Colors.white,
    borderRadius: 10,
  },
});
