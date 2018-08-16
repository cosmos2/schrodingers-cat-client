import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectCat from "./Components/SelectCat";
import OpenBox from "./Components/OpenBox";
import Profile from "./Components/Profile";
import ChatRoom from "./Components/ChatRoom";
import Loading from "./Components/Loading";
import Landing from "./Components/Landing";
import Cat from "./Components/Cat";
import { createStackNavigator } from "react-navigation";
import { Font } from "expo";

const AppNavigator = createStackNavigator(
  {
    LoadingScreen: { screen: Loading },
    SelectCatScreen: { screen: SelectCat },
    OpenBoxScreen: { screen: OpenBox },
    ProfileScreen: { screen: Profile },
    ChatRoomScreen: { screen: ChatRoom },
    LandingScreen: { screen: Landing }
  },
  {
    initialRouteName: "LandingScreen"
  }
);

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      Goyang: require("./assets/fonts/Goyang.otf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    return this.state.fontLoaded ? <AppNavigator /> : null;
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
