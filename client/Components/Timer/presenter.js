import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLimit: 1,
      timeOver: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.time, "내려받는 시간");
    if (nextProps.time < prevState.timeLimit) {
      return { timeOver: true };
    }
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.time !== nextProps.time;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.timeOver !== this.state.timeOver) {
      this.props.stopTimer();
    }
  }

  render() {
    return (
      <View style={styles.timer}>
        <Icon name="md-time" type="ionicon" color="black" size={21} />
        <Text style={styles.text}>{this.props.time}</Text>
      </View>
    );
  }
}

export default TimePicker;
