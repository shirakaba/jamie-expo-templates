import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { runOnUI } from "react-native-reanimated";

export default function App() {
  const [result, setResult] = useState("");

  const runJSThreadExample = useCallback(() => {
    const rootView =
      UIApplication.sharedApplication.keyWindow.rootViewController.view;
    setResult(
      `Got the debugDescription of the root view via direct native API access:\n\n${rootView.debugDescription}\n\n… now try something else!`,
    );
  }, []);

  const runUIThreadExample = useCallback(() => {
    runOnUI(() => {
      // react-native-reanimated does something strange to global scope so we
      // have to access via `global`, meaning we lose all typings :(
      //
      // TODO: try out Margelo's worklets, which handle globals differently:
      // https://github.com/margelo/react-native-worklets-core
      const { UIAlertController, UIAlertAction, UIApplication } = global as any;

      const alertController =
        UIAlertController.alertControllerWithTitleMessagePreferredStyle(
          "Hype alert",
          "We just accessed an arbitrary UIKit API on the UI thread from JS! 🥳",
          UIAlertControllerStyle.Alert,
        );

      alertController.addAction(
        UIAlertAction.actionWithTitleStyleHandler(
          "Sweet",
          UIAlertActionStyle.Default,
          () => {},
        ),
      );

      const rootViewController =
        UIApplication.sharedApplication.keyWindow.rootViewController;
      rootViewController.presentViewControllerAnimatedCompletion(
        alertController,
        true,
        () => {},
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to try out NativeScript!</Text>
      <StatusBar style="auto" />

      <Button onPress={runJSThreadExample} title="Try out JS thread" />
      <Text>{result}</Text>

      <Button onPress={runUIThreadExample} title="Try out UI thread" />
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
