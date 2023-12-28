import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { IProduct } from "../../interface/product";

type Props ={
    item: IProduct
}

const ProductCard = memo(({ item }: Props) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  });

  ProductCard.displayName="ProductCard";

export { ProductCard };

const styles = StyleSheet.create({});