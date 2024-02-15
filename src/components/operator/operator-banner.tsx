import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/colors";
import { Text } from "../../components/common/themed";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
const width = Dimensions.get("screen").width;
const OperatorBanner = memo(() => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationRoutes.PointAccessScreen)}
        style={styles.card}
      >
        <AntDesign color={Colors.primary} name="plus" size={32} />
        <Text style={styles.title}>Оноо олгох</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationRoutes.PointMinusScreen)}
        style={styles.card}
      >
        <AntDesign color={Colors.primary} name="minus" size={32} />
        <Text style={styles.title}>Оноо суутгах</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationRoutes.SearchUserScreen)}
        style={styles.card}
      >
        <AntDesign color={Colors.primary} name="search1" size={32} />
        <Text style={styles.title}>Хэрэглэгч хайх</Text>
      </TouchableOpacity>
    </View>
  );
});

OperatorBanner.displayName = "OperatorBanner";

export { OperatorBanner };

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 3 - 20,
    height: 100,
  },
  title: {
    color: Colors.textBlack,
    fontWeight: "500",
    fontSize: 16,
    marginTop: 4,
    textAlign: "center",
  },
});
