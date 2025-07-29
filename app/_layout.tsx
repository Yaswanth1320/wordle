import * as Font from "expo-font";
import { Stack } from "expo-router";
import { PropsWithChildren, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Michroma: require("../assets/fonts/Michroma-Regular.ttf"),
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121213" }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
