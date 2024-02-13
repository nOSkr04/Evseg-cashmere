import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { NavigationRoutes } from "../../navigation/types";
import { UserApi } from "../../api";
import { BoldText } from "../../components/common/styled-text";
import { AntDesign } from "@expo/vector-icons";

const PointAccessScreen = memo(() => {
  const [hasPermission, setHasPermission] = useState<boolean | string | null>(
    null
  );
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const handleBarCodeScanned = useCallback(
    async ({ data }: { data: string }) => {
      setScanned(true);
      try {
        const user = await UserApi.findUser(data);
        navigation.navigate(NavigationRoutes.GivePointScreen, { user });
        setScanned(false);
      } catch (err) {
        console.log(err);
        Alert.alert("Хэрэглэгч олдсонгүй");
      }
    },
    [navigation ]
  );

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <AntDesign color={Colors.white} name="arrowleft" size={24} />
      </TouchableOpacity>
      {!scanned ? (
        <View style={styles.barcodeContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.barcode}
          />
        </View>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primary} size={"large"} />
        </View>
      )}
      <TouchableOpacity
        disabled={!scanned}
        onPress={() => setScanned(false)}
        style={[styles.loginContainer, !scanned && styles.login]}
      >
        <BoldText style={styles.loginText}>Дахин уншуулах</BoldText>
      </TouchableOpacity>
    </View>
  );
});

PointAccessScreen.displayName = "PointAccessScreen";

export { PointAccessScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.opac50,
  },
  barcodeContainer: {
    marginHorizontal: 16,
  },
  barcode: {
    width : "100%",
    height: "100%",
  },
  loginText: {
    color: Colors.white,
  },
  loginContainer: {
    backgroundColor: Colors.primary,
    borderRadius   : 10,
    paddingVertical: 12,
    justifyContent : "center",
    alignItems     : "center",
    position       : "absolute",
    zIndex         : 2,
    bottom         : 20,
    right          : 20,
    left           : 20,
  },
  login: {
    opacity: 0.2,
  },
  backButton: {
    backgroundColor: Colors.opac50,
    position       : "absolute",
    zIndex         : 2,
    top            : 50,
    left           : 20,
    padding        : 10,
    borderRadius   : 10,
  },
  loader: { alignItems: "center", justifyContent: "center", flex: 1 },
});
