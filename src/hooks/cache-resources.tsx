import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    // async function loadResourcesAndDataAsync() {
    //   try {
    //     SplashScreen.preventAutoHideAsync();
    //     // Load fonts
    //     await Font.loadAsync({
    //       "NunBold"    : require("../assets/fonts/Nunito-Bold.ttf"),
    //       "NunSemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    //       "NunMedium"  : require("../assets/fonts/Nunito-Medium.ttf"),
    //       "NunRegular" : require("../assets/fonts/Nunito-Regular.ttf"),
    //       "NunThin"    : require("../assets/fonts/Nunito-Light.ttf"),
    //     });
    //   } catch (e) {
    //     // We might want to provide this error information to an error reporting service
    //     console.warn(e);
    //   } finally {
    //     setIsLoadingComplete(true);
    //     SplashScreen.hideAsync();
    //   }
    // }
    // loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
