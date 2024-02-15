import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { persistor, store } from "./src/store";
import { SwrProviderConfig } from "./src/provider/swr-provider";
import { NavigationContainer } from "./src/navigation/navigation-container";
import { useUpdates } from "./src/hooks/use-update";
import useCachedResources from "./src/hooks/cache-resources";
import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar } from "expo-status-bar";
const App = () => {
  // const isLoadingComplete = useCachedResources();
  const { onFetchUpdateAsync } = useUpdates();

  useEffect(() => {
    onFetchUpdateAsync();
  }, [onFetchUpdateAsync]);

  // if (!isLoadingComplete) {
  //   return null;
  // }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig value={SwrProviderConfig}>
          <SafeAreaProvider>
            <GestureHandlerRootView style={styles.root}>
              <ToastProvider>
                <BottomSheetModalProvider>
                  <NavigationContainer />
                  <StatusBar style="dark" />
                </BottomSheetModalProvider>
              </ToastProvider>
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
  },
});
