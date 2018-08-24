import React, { Component } from "react";
import { View, Text, AppState } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";

export default class TimePicker extends Component {
  state = {
    appState: AppState.currentState
    // timeOver: false
  };
  componentWillReceiveProps() {
    if (this.props.time === 1) {
      this.props.stopTimer();
    }
  }
  // componentDidMount() {
  //   AppState.addEventListener("change", this._handleAppStateChange);
  // }
  // componentWillUnmount() {
  //   AppState.removeEventListener("change", this._handleAppStateChange);
  // }
  // _handleAppStateChange = nextAppState => {
  //   if (
  //     this.state.appState.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
  //     if (this.props.time < 90) {
  //       this.setState({ timeOver: true });
  //     }
  //   }
  //   this.setState({ appState: nextAppState });
  // };
  render() {
    return (
      <View style={styles.timer}>
        <Icon name="md-time" type="ionicon" color="black" size={21} />
        <Text style={styles.text}>{this.props.time}</Text>;
      </View>
    );
  }
}
