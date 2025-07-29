// app/index.js
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/difficulty");
    }, 2000); // 2-second splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { fontFamily: "Michroma" }]}>
        WORDLE{" "}
        <Text style={[styles.logoAccent, { fontFamily: "Michroma" }]}>X</Text>
      </Text>
      <Text style={[styles.subtext, { fontFamily: "Michroma" }]}>
        Guess the Word!
      </Text>
      <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121213",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 40,
    color: "#fff",

    letterSpacing: 2,
  },
  logoAccent: {
    color: "#4CAF50",
  },
  subtext: {
    fontSize: 18,
    color: "#bbb",
    marginTop: 12,
    marginBottom: 32,
    letterSpacing: 1,
  },
  loader: {
    marginTop: 16,
  },
});
