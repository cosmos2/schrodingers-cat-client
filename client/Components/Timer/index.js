import React, { Component } from "react";
import TimePicker from "./presenter";

export default class Timer extends Component {
  state = {
    timeOver: false,
    time: this.props.leftTime
  };

  componentDidMount() {
    const timer = setInterval(() => {
      this.setState(prevState => {
        return { time: prevState.time - 1 };
      });
    }, 1000);
    this.setState({ timer });
  }
  componentWillUnmount() {
    this._clearInterval();
  }
  _stopTimer = async () => {
    try {
      await this.props.socket.emit("timeOut");
      await this.props.explodeChatRoom();
      await this.props.resetchat();
    } catch (err) {
      console.log(err);
    }
  };
  _clearInterval = () => {
    clearInterval(this.state.timer);
  };
  render() {
    return (
      <TimePicker
        time={this.state.time}
        stopTimer={this._stopTimer}
        clearInterval={this._clearInterval}
      />
    );
  }
}
