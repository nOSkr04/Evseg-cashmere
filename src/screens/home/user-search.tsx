import { StyleSheet, } from "react-native";
import React, { memo } from "react";
import { NormalBar } from "../../components/app-bar/normal-bar";
import { Text } from "../../components/common/themed";

const UserSearchScreen = memo(() => {
    return (
      <>
        <NormalBar/>
        <Text>UserSearchScreen</Text>
      </>
    );
  });

  UserSearchScreen.displayName="UserSearchScreen";

export { UserSearchScreen };

const styles = StyleSheet.create({});