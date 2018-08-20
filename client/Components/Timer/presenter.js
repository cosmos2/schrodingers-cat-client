import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default class TimePicker extends Component {
  componentWillReceiveProps() {
    if (this.props.time === 1) {
      this.props.stopTimer();
    }
  }
  render() {
    return (
      <View style={styles.timer}>
        <Text style={styles.text}>{this.props.time}</Text>;
      </View>
    );
  }
}
