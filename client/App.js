import React from "react";
import { AsyncStorage } from "react-native";
import AppPresenter from "./appPresenter";
import axios from "axios";

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
      // await AsyncStorage.removeItem("token");
      const getToken = await AsyncStorage.getItem("token");
      if (getToken !== null) {
        const token = JSON.parse(getToken).query;
        this.setState({ token });
      } else {
        // when run at the first time
        const response = await axios.post("http://52.79.251.45:8080/init/1");
        await AsyncStorage.setItem("token", JSON.stringify(response.data));
        await AsyncStorage.setItem("firstTime", "firstTime");
        const token = response.data.query;
        this.setState({ token, firstStart: true });
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return this.state.token === "nothing" ? null : (
      <AppPresenter
        token={this.state.token}
        firstStart={this.state.firstStart}
      />
    );
  }
}
