import React from "react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { persistor, store } from "./src/store";
import { SwrProviderConfig } from "./src/provider/swr-provider";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "./src/navigation/navigation-container";

const App = () => {
  return(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig value={SwrProviderConfig}   >
          <SafeAreaProvider>
            <GestureHandlerRootView style={styles.root}>
              <NavigationContainer/>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});