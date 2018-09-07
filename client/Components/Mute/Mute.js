import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

class Mute extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>10초만 조용히 있어보는고양</Text>
      </View>
    );
  }
}

export default Mute;
