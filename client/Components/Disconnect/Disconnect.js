import React, { Component } from "react";
import { View, Text, Image, StyleSheet, AppState } from "react-native";
import Store from "../store";
import styles from "./styles";

class Disconnect extends Component {
  state = {
    appState: AppState.currentState
  };
  static navigationOptions = {
    header: null
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.timeoutHandle = setTimeout(() => {
        context.disconnectcontrol();
      }, 1500);
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    if (this.state.appState === "active") {
      this.timeoutHandle = setTimeout(() => {
        context.disconnectcontrol();
      }, 1500);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <View style={styles.container}>
        <Store.Consumer>
          {store => {
            context = store;
            return <Text style={styles.title}>고양이들이 사라졌다!</Text>;
          }}
        </Store.Consumer>
      </View>
    );
  }
}

export default Disconnect;
