import { StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import { IProduct } from "../../interface/product";
import { Image } from "expo-image";
import { Colors } from "../../constants/colors";
import { BoldText, MediumText, SemiBoldText } from "../common/styled-text";

type Props = {
  item: IProduct;
};

const ProductCard = memo(({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.saleContainer}>
        <SemiBoldText style={styles.saleText}>-15%</SemiBoldText>
      </View>
      <Image
        source={
        "https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D"
        }
        style={styles.image}
      />
      <MediumText numberOfLines={1} style={styles.title}>
        {item.name}
      </MediumText>
      <View>
        <BoldText style={styles.price}>149,000 ₮</BoldText>

      </View>
    </View>
  );
});

ProductCard.displayName = "ProductCard";

export { ProductCard };

const styles = StyleSheet.create({
  container: {
    borderWidth : 1,
    borderRadius: 10,
    width       : 176,
    padding     : 6,
    borderColor : Colors.border,
    marginRight : 6
  },
  image: {
    width       : 164,
    height      : 150,
    borderRadius: 8,
  },
  saleContainer: {
    position         : "absolute",
    top              : 10,
    left             : 10,
    backgroundColor  : Colors.danger,
    paddingHorizontal: 8,
    paddingVertical  : 4,
    borderRadius     : 5,
    zIndex           : 2,
  },
  saleText: {
    fontSize: 10,
    color   : Colors.white,
  },
  title: {
    fontSize : 14,
    marginTop: 6,
  },
  price: {
    fontSize : 14,
    color    : Colors.black,
    marginTop: 2
  }
});
