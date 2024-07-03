import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [result, setResult] = useState("");

  const onPress = useCallback(() => {
    const rootView =
      UIApplication.sharedApplication.keyWindow.rootViewController.view;
    setResult(
      `Got the debugDescription of the root view via direct native API access:\n\n${rootView.debugDescription}\n\n… now try something else!`,
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button onPress={onPress} title="Try NativeScript" />
      <Text>{result}</Text>
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
