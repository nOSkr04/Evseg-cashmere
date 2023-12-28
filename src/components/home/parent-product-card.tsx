import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { IParentProduct } from "../../interface/parent-product";
import { ProductCard } from "./product-card";

type Props ={
    product:IParentProduct
}

const ParentProductCard = memo(({ product }: Props) => {
    return (
      <View>
        <Text>{product.name}</Text>
        <ScrollView horizontal>
          {product.data.map((item) => {
            return <ProductCard item={item} key={item._id}  />;
          })}
        </ScrollView>
      </View>
    );
  });

  ParentProductCard.displayName="ParentProductCard";

export { ParentProductCard };

const styles = StyleSheet.create({});