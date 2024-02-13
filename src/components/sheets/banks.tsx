import { Dimensions,  StyleSheet,  TouchableOpacity,  } from "react-native";
import React, { memo, useCallback } from "react";
import { MediumText } from "../common/styled-text";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

type Props = {
    onChange: (...event: any[]) => void;
    closeUserTypeModal: () => void;
  };
  const width = Dimensions.get("window").width;
const BanksSheet = memo(({ onChange, closeUserTypeModal }: Props) => {
    const data = [
        {
            name       : "qPay wallet",
            description: "qPay хэтэвч",
            logo       : "https://s3.qpay.mn/p/e9bbdc69-3544-4c2f-aff0-4c292bc094f6/launcher-icon-ios.jpg",
            _id        : "659584c28ae96d925c72f3bf"
        },
        {
            name       : "Khan bank",
            description: "Хаан банк",
            logo       : "https://qpay.mn/q/logo/khanbank.png",
            _id        : "659584c28ae96d925c72f3c0"
        },
        {
            name       : "State bank",
            description: "Төрийн банк",
            logo       : "https://qpay.mn/q/logo/statebank.png",
            _id        : "659584c28ae96d925c72f3c1"
        },
        {
            name       : "State bank 3.0",
            description: "Төрийн банк 3.0",
            logo       : "https://qpay.mn/q/logo/state_3.png",
            _id        : "659584c28ae96d925c72f3c2"
        },
        {
            name       : "Xac bank",
            description: "Хас банк",
            logo       : "https://qpay.mn/q/logo/xacbank.png",
            _id        : "659584c28ae96d925c72f3c3"
        },
        {
            name       : "Trade and Development bank",
            description: "TDB online",
            logo       : "https://qpay.mn/q/logo/tdbbank.png",
            _id        : "659584c28ae96d925c72f3c4"
        },
        {
            name       : "Social Pay",
            description: "Голомт банк",
            logo       : "https://qpay.mn/q/logo/socialpay.png",
            _id        : "659584c28ae96d925c72f3c5"
        },
        {
            name       : "Most money",
            description: "МОСТ мони",
            logo       : "https://qpay.mn/q/logo/most.png",
            _id        : "659584c28ae96d925c72f3c6"
        },
        {
            name       : "National investment bank",
            description: "Үндэсний хөрөнгө оруулалтын банк",
            logo       : "https://qpay.mn/q/logo/nibank.jpeg",
            _id        : "659584c28ae96d925c72f3c7"
        },
        {
            name       : "Chinggis khaan bank",
            description: "Чингис Хаан банк",
            logo       : "https://qpay.mn/q/logo/ckbank.png",
            _id        : "659584c28ae96d925c72f3c8"
        },
        {
            name       : "Capitron bank",
            description: "Капитрон банк",
            logo       : "https://qpay.mn/q/logo/capitronbank.png",
            _id        : "659584c28ae96d925c72f3c9"
        },
        {
            name       : "Bogd bank",
            description: "Богд банк",
            logo       : "https://qpay.mn/q/logo/bogdbank.png",
            _id        : "659584c28ae96d925c72f3ca"
        },
        {
            name       : "Trans bank",
            description: "Тээвэр хөгжлийн банк",
            logo       : "https://qpay.mn/q/logo/transbank.png",
            _id        : "659584c28ae96d925c72f3cb"
        },
        {
            name       : "M bank",
            description: "М банк",
            logo       : "https://qpay.mn/q/logo/mbank.png",
            _id        : "659584c28ae96d925c72f3cc"
        },
        {
            name       : "Ard App",
            description: "Ард Апп",
            logo       : "https://qpay.mn/q/logo/ardapp.png",
            _id        : "659584c28ae96d925c72f3cd"
        },
        {
            name       : "Arig bank",
            description: "Ариг банк",
            logo       : "https://qpay.mn/q/logo/arig.png",
            _id        : "659584c28ae96d925c72f3ce"
        },
        {
            name       : "Monpay",
            description: "Мон Пэй",
            logo       : "https://qpay.mn/q/logo/monpay.png",
            _id        : "659584c28ae96d925c72f3cf"
        }
    ];
    const onSelected = useCallback((type: {
        logo: string,
        name: string
    }) => {
        onChange(type);
        closeUserTypeModal();
  },[closeUserTypeModal, onChange]);
    return (
      <BottomSheetFlatList
        columnWrapperStyle={styles.columnStyle}
        data={data}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={({ item } ) => {
          return (
            <TouchableOpacity onPress={() => onSelected(item)} style={styles.contentContainer}>
              <Image source={item.logo} style={styles.logo}  />
              <MediumText numberOfLines={1} style={styles.title}>{item.description}</MediumText>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      />
    );
  });

  BanksSheet.displayName="BanksSheet";

export { BanksSheet };

const styles = StyleSheet.create({
    container: {
        flex: 1
        },
        contentContainer: {
          width          : width /3 - 24,
          borderWidth    : 1,
          alignItems     : "center",
          justifyContent : "center",
          borderRadius   : 8,
          borderColor    : Colors.grey,
          paddingVertical: 12
        },
        columnStyle: {
          marginHorizontal: 24,
          marginVertical  : 5,
          justifyContent  : "space-between"
        },
        title: {
          fontSize : 12,
          color    : Colors.primaryText,
          marginTop: 10
        },
        logo: {
            width       : 50,
            height      : 50,
            borderRadius: 8
        }
});