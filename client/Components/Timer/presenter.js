import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";

export default class TimePicker extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.time === 1) {
      this.props.stopTimer();
    }
  }
  componentDidMount() {
    console.log(this.props.stopTimer);
    console.log(this.props.clearInterval);
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
