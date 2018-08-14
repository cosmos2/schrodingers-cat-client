import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class SelectCat extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="SelectCat"
          onPress={() => this.props.navigation.navigate("OpenBoxScreen")}
        />
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
