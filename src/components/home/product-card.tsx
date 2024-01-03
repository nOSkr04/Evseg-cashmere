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
      <Image source={"https://scontent.fuln1-1.fna.fbcdn.net/v/t39.30808-6/414420396_903184197870311_5892860015957832423_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=B_UGesuCp6UAX8IwQNW&_nc_ht=scontent.fuln1-1.fna&oh=00_AfDXXaM-ijTX2dI0WXfzvAE4khW58AwkFc-XRo2EjMkufA&oe=6595EC1D"} style={styles.image} />
      <BoldText numberOfLines={1} style={styles.title}>
        Ороолт малгай бла2 бла2
      </BoldText>
      <View style={styles.priceContainer}>
        <MediumText style={styles.availableCount}>8ш үлдсэн</MediumText>
        <SemiBoldText style={styles.priceText}>250,000₮</SemiBoldText>
        
      </View>
    </View>
  );
});

ProductCard.displayName = "ProductCard";

export { ProductCard };

const styles = StyleSheet.create({
  container: {
    borderColor : Colors.border,
    borderWidth : 1,
    width       : 186,
    borderRadius: 14,
    marginRight : 14
  },
  image: {
    width       : 158,
    height      : 148,
    margin      : 14,
    borderRadius: 14
  },
  title: {
    marginHorizontal: 14,
    fontSize        : 14,
    color           : Colors.primaryText
  },
  priceContainer: {
    flexDirection   : "row",
    alignItems      : "center",
    marginHorizontal: 14,
    marginTop       : 7,
    justifyContent  : "space-between",
    marginBottom    : 14

  },
  availableCount: {
    fontSize: 12,
    color   : Colors.secondaryText
  },
  priceText: {
    fontSize: 16,
    color   : Colors.primaryText
  }
 
});
