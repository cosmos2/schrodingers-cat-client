import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectCat from "./Components/SelectCat";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SelectCat />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
