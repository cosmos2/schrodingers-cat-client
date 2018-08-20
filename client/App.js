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
    console.log("app did mount");
    try {
      //await AsyncStorage.removeItem("token");
      const response = await AsyncStorage.getItem("token");
      if (response !== null) {
        const token = JSON.parse(response).query;
        this.setState({ token });
      } else {
        this.setState({ token: "noToken" });
      }
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
