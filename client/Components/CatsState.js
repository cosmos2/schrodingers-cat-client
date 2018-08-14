import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default class CatsState extends Component {
  render() {
    return (
      <View style={styles.state}>
        <View style={styles.uppercat}>
          <View style={styles.cat1} />
          <View style={styles.cat2} />
        </View>
        <View style={styles.lowercat}>
          <View style={styles.cat3} />
          <View style={styles.cat4} />
        </View>
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
  },
  state: {
    flex: 1,
    flexDirection: "column",
    //backgroundColor: "red",
    borderWidth: 1,
    borderColor: "black"
  },
  uppercat: {
    flex: 1,
    flexDirection: "row"
  },
  lowercat: {
    flex: 1,
    flexDirection: "row"
  },
  cat1: {
    flex: 1,
    backgroundColor: "red"
  },
  cat2: {
    flex: 1,
    backgroundColor: "blue"
  },
  cat3: {
    flex: 1,
    backgroundColor: "yellow"
  },
  cat4: {
    flex: 1,
    backgroundColor: "green"
  }
});
