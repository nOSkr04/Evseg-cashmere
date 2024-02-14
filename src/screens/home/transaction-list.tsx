import { Dimensions, StyleSheet, View } from "react-native";
import React, { memo, useCallback } from "react";
import { ITransaction } from "../../interface/transaction";
import { Colors } from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../../components/common/themed";
import { format } from "date-fns";
const width = Dimensions.get("window").width;

const TransactionList = memo(({ item }: { item: ITransaction }) => {

    const rightContainer = useCallback(() => {
        if(item.isMinus){
            return(
              <>
                <Text style={styles.price}>200,000 ₮</Text>
                <Text style={styles.point}>-{item.minusMoney?.toLocaleString()}P хасав</Text>
                <Text style={styles.point}>-{(item?.minusMoney - item.point).toLocaleString()} э/дүн</Text>
                <Text style={styles.date}>{format(new Date(item.createdAt), "yyyy-MM-dd")}</Text>
                <Text style={styles.hours}>{format(new Date(item.createdAt), "hh:mm")}</Text>
              </>
            );
        }
        return(
          <>
            <Text style={styles.price}>{item.money.toLocaleString()} ₮</Text>
            <Text style={styles.point}>+{item.point.toLocaleString()}P оров</Text>
            <Text style={styles.date}>{format(new Date(item.createdAt), "yyyy-MM-dd")}</Text>
            <Text style={styles.hours}>{format(new Date(item.createdAt), "hh:mm")}</Text>
          </>
        );
    },[item]);

  return (
    <View style={[styles.container, item.isMinus && styles.redBorder]}>
      {item.isMinus ? (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            color={Colors.white}
            name="cash-minus"
            size={18}
          />
        </View>
      ) : (
        <View style={[styles.iconContainer, styles.secondaryBg]}>
          <MaterialCommunityIcons
            color={Colors.white}
            name="cash-plus"
            size={18}
          />
        </View>
      )}
      <View style={styles.contentRow}>

     
        <View style={styles.middleContent}>
          {item.isMinus ? (
            <Text style={[styles.title, styles.colorDanger]}>Оноо суутгав</Text>
        ) : (
          <Text style={styles.title}>Оноо олгов</Text>
        )}
          <Text style={styles.username}>
            {`${item.receivedUser.lastName} ${item.receivedUser.firstName}`}{" "}
          </Text>
          <View>
            <Text style={styles.phoneTitle}>Утас</Text>
            <Text>{item.receivedUser.phone}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          {rightContainer()}
        </View>
      </View>
    </View>
  );
});

TransactionList.displayName = "TransactionList";

export { TransactionList };

const styles = StyleSheet.create({
  container: {
    borderWidth     : 1,
    marginTop       : 8,
    marginHorizontal: 16,
    borderRadius    : 12,
    padding         : 8,
    backgroundColor : Colors.white,
    shadowColor     : Colors.black,
    shadowOffset    : {
      width : 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius : 16.0,
    elevation    : 24,
    flexDirection: "row",
    borderColor  : Colors.green,
  
  },
  redBorder: {
    borderColor: Colors.danger,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    alignItems     : "center",
    justifyContent : "center",
    borderRadius   : 8,
    padding        : 10,
    height         : 40
  },
  secondaryBg: {
    backgroundColor: Colors.secondary,
  },
  middleContent: {
    width: "70%"
  },
  title: {
    fontSize  : 16,
    fontWeight: "bold",
    color     : Colors.green,
  },
  colorDanger: {
    color: Colors.danger,
  },
  username: {
    fontSize  : 14,
    fontWeight: "400",
    color     : Colors.textBlack,
    marginTop : 2,
  },
  phoneTitle: {
    fontSize  : 12,
    fontWeight: "400",
    color     : Colors.secondaryText,
    marginTop : 5,
  },
  phone: {
    fontSize  : 12,
    fontWeight: "400",
    color     : Colors.textBlack,
    marginTop : 2,
  },
  rightContainer: {
    width     : "30%",
    alignItems: "flex-end"
  },
  contentRow: {
    marginLeft    : 10,
    flexDirection : "row",
    justifyContent: "space-between",
    width         : width - 108
  },
  price: {
    fontSize  : 16,
    fontWeight: "bold",
    color     : Colors.textBlack,
  },
  point: {
    fontSize  : 12,
    fontWeight: "400",
    color     : Colors.secondaryText,
    marginTop : 5
  },
  date: {
    fontSize : 12,
    color    : Colors.textBlack60,
    marginTop: 6
  },
  hours: {
    fontSize : 12,
    color    : Colors.textBlack60,
    marginTop: 2
  }
});
