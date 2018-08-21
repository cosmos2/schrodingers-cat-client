import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Alert } from "react-native";
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
      this.setState({
        roomusers: JSON.parse(users),
        leftTime
      });
      console.log(users);
      console.log(leftTime);
    });

    this._socket.on("leaveRoom", users => {
      this.setState({
        roomusers: JSON.parse(users)
      });
      console.log(users, "<----------이건 리브룸");
    });

    //"chat"으로 들어온 정보를 messages 라는 배열에 저장하기 위함
    this._socket.on("chat", data => {
      console.log(data, "this is message");
      this._storemessage({
        userId: data.userId,
        catId: data.catImage,
        message: data.message
      });
    });

    //새로 들어온 채팅을 추가해 messages라는 state에 저장하기 위함
    this._storemessage = chat => {
      const arr = this.state.messages;
      arr.push(chat);
      this.setState({
        messages: arr
      });
    };

    // this._myuserId = async () => {
    //   console.log("my user id");
    //   const myuserId = await AsyncStorage.getItem("myUserId");
    //   this.setState({
    //     myuserId: JSON.parse(myuserId).myuserId
    //   });
    // };

    this._socket.on("hit", data => {
      var arr = this.state.roomusers.slice();
      var arr2 = [...arr];
      for (var i = 0; i < arr2.length; i++) {
        if (data === arr2[i].socketId) {
          arr2[i].hp > 0 ? (arr2[i].hp -= 1) : null;
        }
      }
      this.setState({
        roomusers: arr2
      });
    });

    this._resetchat = () => {
      this.setState({
        roomusers: [],
        messages: []
      });
    };

    // this._muted = () => {
    //   Alert.alert("what");
    // };

    this._muteControl = () => {
      console.log("mute control");
      // console.log(this.props.myUserId, "this is my userId");
      for (var i = 0; i < this.state.roomusers.length; i++) {
        if (
          this.state.roomusers[i].userId === this.props.myUserId &&
          this.state.roomusers[i].hp <= 2
        ) {
          return true;
        }
      }
    };

    this.state = {
      fontLoaded: false,
      socket: this._socket,
      token: this.props.token,
      roomusers: [],
      myInfo: {},
      messages: [],
      leftTime: 600,
      resetchat: this._resetchat,
      muteornot: false,
      mutecontrol: this._muteControl,
      test: this._test
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
    //this._muteControl();
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
