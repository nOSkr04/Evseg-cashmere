import { FlatList,  StyleSheet,  View } from "react-native";
import React, { memo, useCallback } from "react";
import { IParentProduct } from "../../interface/parent-product";
import { ProductCard } from "./product-card";
import { IProduct } from "../../interface/product";
import { Colors } from "../../constants/colors";
import { BoldText, MediumText } from "../common/styled-text";

type Props = {
  product: IParentProduct;
};

const ParentProductCard = memo(({ product }: Props) => {
  const renderItem = useCallback(({ item }: { item: IProduct }) => {
    return <ProductCard item={item} />;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.rowTitle}>
        <BoldText style={styles.title}>{product.name}</BoldText>
        <MediumText style={styles.description}>Дэлгэрэнгүи</MediumText>
      </View>
      <FlatList data={product.data} horizontal renderItem={renderItem} showsHorizontalScrollIndicator={false} style={styles.contentContainer}  />
    </View>
  );
});

ParentProductCard.displayName = "ParentProductCard";

export { ParentProductCard };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
    marginTop      : 10
  },
   rowTitle: {
    flexDirection   : "row",
    alignItems      : "center",
    justifyContent  : "space-between",
    marginHorizontal: 24,
   },
   title: {
    fontSize: 16,
    color   : Colors.black
   },
   description: {
    color   : Colors.primary,
    fontSize: 14
   },
   contentContainer: {
    paddingLeft: 24,
    marginTop  : 12,
   }
});
