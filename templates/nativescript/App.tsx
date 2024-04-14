import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const onPress = useCallback(() => {
    const rootView =
      UIApplication.sharedApplication.keyWindow.rootViewController.view;
    console.log(rootView.debugDescription);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button onPress={onPress} title="Try NativeScript" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
