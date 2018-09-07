import React from "react";
import { AsyncStorage } from "react-native";
import AppPresenter from "./appPresenter";
import axios from "axios";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "nothing",
      myUserId: 0
    };
  }
  _checkUser = async () => {
    const response = await axios.post("https://catadmin.gq/init/1");
    await AsyncStorage.setItem("token", JSON.stringify(response.data));
    await AsyncStorage.setItem("firstTime", "firstTime");
    const token = response.data.query;
    this.setState({ token, firstStart: true });
  };
  async componentDidMount() {
    try {
      // await AsyncStorage.removeItem("token");
      // await AsyncStorage.removeItem("myUserId");
      const getToken = await AsyncStorage.getItem("token");
      const myUserId = await AsyncStorage.getItem("myUserId");
      if (myUserId !== null) {
        this.setState({
          myUserId: JSON.parse(myUserId).userId
        });
      } else if (myUserId === null && getToken) {
        this._checkUser();
      }
      if (getToken !== null) {
        const token = JSON.parse(getToken).query;
        this.setState({ token });
      } else {
        // when run at the first time
        this._checkUser();
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
        myUserId={this.state.myUserId}
      />
    );
  }
}

export default Index;
