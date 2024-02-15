import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { IUser } from "../../interface/user";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

const UserList = memo(({ item }: { item: IUser }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(NavigationRoutes.GivePointScreen, { user: item })
      }
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          {item.userType !== "user" ? (
            <FontAwesome color={Colors.white} name="user" size={24} />
          ) : (
            <FontAwesome
              color={Colors.white}
              name="drivers-license"
              size={18}
            />
          )}
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.username}>
            {item.lastName} {item.firstName}
          </Text>
          <Text style={styles.phone}>{item.phone}</Text>
          <Text style={styles.userType}>
            {item.userType === "driver"
              ? "Жолооч"
              : item.userType === "guide"
                ? "Хөтөч"
                : "Хэрэглэгч"}
          </Text>
        </View>
      </View>
      <View style={styles.badgeContainer}>
        <Text style={styles.badge}>{item.loyaltyPercent}%</Text>
      </View>
    </TouchableOpacity>
  );
});

UserList.displayName = "UserList";

export { UserList };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Colors.secondary,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  userContainer: {
    marginLeft: 10,
  },
  username: {
    fontWeight: "500",
    color: Colors.black,
    fontSize: 14,
  },
  phone: {
    fontWeight: "400",
    color: Colors.black,
    fontSize: 12,
    marginTop: 2,
  },
  userType: {
    fontWeight: "400",
    color: Colors.black,
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "bold",
  },
});
