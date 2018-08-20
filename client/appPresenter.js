import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import SelectCat from "./Components/SelectCat";
import OpenBox from "./Components/OpenBox";
import Profile from "./Components/Profile";
import ChatRoom from "./Components/ChatRoom";
import Loading from "./Components/Loading";
import Landing from "./Components/Landing";
import Cat from "./Components/Cat";
import { createStackNavigator } from "react-navigation";
import { Font } from "expo";
import Store from "./Components/store";
import SocketIOClient from "socket.io-client";

const AppNavigator = createStackNavigator(
  {
    LoadingScreen: { screen: Loading },
    SelectCatScreen: { screen: SelectCat },
    OpenBoxScreen: { screen: OpenBox },
    ProfileScreen: { screen: Profile },
    ChatRoomScreen: { screen: ChatRoom },
    LandingScreen: { screen: Landing },
    CatComponent: { screen: Cat }
  },
  {
    initialRouteName: "LandingScreen"
  }
);

export default class AppPresenter extends React.Component {
  constructor(props) {
    super(props);

    this._socket = SocketIOClient("http://52.79.251.45:8080", {
      query: this.props.token
    });
    this._socket.on("info", myInfo => {
      this.setState({
        myInfo
      });
    });
    this._socket.on("findRoom", (users, leftTime) => {
      console.log(users);
      console.log(leftTime);
    });

    this.state = {
      fontLoaded: false,
      socket: this._socket,
      token: this.props.token,
      roomusers: [],
      myInfo: {}
    };
  }

  async componentDidMount() {
    console.log(this.props.token);
    await Font.loadAsync({
      Goyang: require("./assets/fonts/Goyang.otf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <Store.Provider value={this.state}>
        <AppNavigator />
      </Store.Provider>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
