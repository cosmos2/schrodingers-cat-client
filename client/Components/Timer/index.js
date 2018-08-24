import React, { Component } from "react";
import TimePicker from "./presenter";

export default class Timer extends Component {
  state = {
    timeOver: false,
    time: this.props.leftTime
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.leftTime !== prevState.time) {
      return { time: nextProps.leftTime };
    }
    return null;
  }

  componentDidMount() {
    // console.log(this.props.leftTime, "<--- leftTime");
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
      await this.props.resetchat();
      // this.setState({ time: this.props.leftTime });
      await this.props.explodeChatRoom();
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
