import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";

export default class TimePicker extends Component {
  componentWillReceiveProps() {
    if (this.props.time === 1) {
      this.props.stopTimer();
    }
  }
  render() {
    return (
      <View style={styles.timer}>
        <Icon name="md-time" type="ionicon" color="black" size={21} />
        <Text style={styles.text}>{this.props.time}</Text>;
      </View>
    );
  }
}
