import React from "react";
import { AsyncStorage } from "react-native";
import AppPresenter from "./appPresenter";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "nothing"
    };
  }
  async componentDidMount() {
    try {
      const response = await AsyncStorage.getItem("token");
      const token = await JSON.parse(response);
      this.setState({ token: token.token });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return this.state.token === "nothing" ? null : (
      <AppPresenter token={this.state.token} />
    );
  }
}
