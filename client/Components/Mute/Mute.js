import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
class test extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>혼자 있을 시간이 필요한고양</Text>
      </View>
    );
  }
}

export default test;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#FFAA0E",
    fontFamily: "Goyang",
    fontSize: 35,
    marginTop: 10,
    fontWeight: "900",
    marginBottom: 10
  }
});
