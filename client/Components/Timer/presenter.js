import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Store from "../store";

export default class TimePicker extends Component {
  componentWillReceiveProps() {
    if (this.props.time === 1) {
      this.props.stopTimer();
    }
  }
  render() {
    return (
      <View style={styles.timer}>
        <Store.Consumer>
          {store => {
            return (
              <Text style={styles.text}>
                {store.leftTime + this.props.time}
              </Text>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}
