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
    return <TimePicker time={this.state.time} stopTimer={this._stopTimer} />;
  }
  _stopTimer = async () => {
    try {
      await clearInterval(this.state.timer);
      await this.setState({ timeOver: true });
      console.log("여기까진 가나?");
      await this.props.socket.emit("leaveRoom");
      console.log("리브룸을 날렸다.");
      await this.props.resetchat();
      await this.props.explodeChatRoom();
      await console.log(
        `if timeOver is ${this.state.timeOver} send to server time's up`
      );
    } catch (err) {
      console.log(err);
    }
  };
}
