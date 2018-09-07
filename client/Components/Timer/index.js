import React, { Component } from "react";
import TimePicker from "./presenter";
import Store from "../store";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOver: false,
      time: this.props.store.organizedTime
    };
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.leftTime < prevState.time) {
  //     const time =
  //       100 + nextProps.leftTime - Math.floor(new Date().getTime() / 1000);
  //     return { time };
  //   }
  //   return null;
  // }
  _stopTimer = async () => {
    const { socket, resetchat } = this.props.store;
    const { explodeChatRoom } = this.props;
    try {
      await socket.emit("timeOut");
      await resetchat();
      // this.setState({ time: "" });
      await explodeChatRoom();
    } catch (err) {
      console.log(err);
    }
  };
  _clearInterval = () => {
    clearInterval(this.state.timer);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.time !== nextState.time;
  }
  componentDidMount() {
    console.log("타이머가 마운트가 됐습니다요");
    const timer = setInterval(() => {
      const time =
        100 +
        this.props.store.leftTime -
        Math.floor(new Date().getTime() / 1000);
      this.setState({ time });
    }, 1000);
    this.setState({ timer });
  }
  componentWillUnmount() {
    this._clearInterval();
  }
  componentDidUpdate() {
    console.log("timer CDU");
  }

  render() {
    console.log("랜더가 된다");
    return <TimePicker time={this.state.time} stopTimer={this._stopTimer} />;
  }
}

export default props => (
  <Store.Consumer>
    {store => {
      console.log("store");
      return <Timer {...props} store={store} />;
    }}
  </Store.Consumer>
);
