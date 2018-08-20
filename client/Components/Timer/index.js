import React, { Component } from "react";
import { View } from "react-native";
import TimePicker from "./presenter";
import styles from "./styles";

export default class Timer extends Component {
  state = {
    timeOver: false,
    time: this.props.leftTime
  };
  componentDidMount() {
    if (this.state.timeOver === false) {
      const timer = setInterval(() => {
        this.setState(prevState => {
          return { time: prevState.time - 1 };
        });
      }, 1000);
      this.setState({ timer });
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  render() {
    return (
      <View style={styles.container}>
        <TimePicker time={this.state.time} stopTimer={this._stopTimer} />
      </View>
    );
  }
  _stopTimer = async () => {
    try {
      await clearInterval(this.state.timer);
      await this.setState({ timeOver: true });
      await this.props.socket.emit("leaveRoom");
      await this.props.explodeChatRoom();
      await console.log(
        `if timeOver is ${this.state.timeOver} send to server time's up`
      );
    } catch (err) {
      console.log(err);
    }
  };
}
