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
import EditProfile from "./Components/EditProfile";
import Mute from "./Components/Mute";

const AppNavigator = createStackNavigator(
  {
    LoadingScreen: { screen: Loading },
    SelectCatScreen: { screen: SelectCat },
    OpenBoxScreen: { screen: OpenBox },
    ProfileScreen: { screen: Profile },
    ChatRoomScreen: { screen: ChatRoom },
    LandingScreen: { screen: Landing },
    CatComponent: { screen: Cat },
    EditProfileScreen: { screen: EditProfile },
    MuteScreen: { screen: Mute }
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

    this._socket.on("selectCat", userInfo => {
      this._getUserInfo(userInfo);
    });

    this._getUserInfo = async userInfo => {
      try {
        const myInfo = {
          userId: userInfo.userId,
          catId: userInfo.catImage
        };
        const myUserId = await AsyncStorage.setItem(
          "myUserId",
          JSON.stringify(myInfo)
        );
        await this.setState({
          myUserId: JSON.parse(myUserId).userId
        });
      } catch (err) {
        console.log(err);
      }
    };

    this._socket.on("fill", data => {
      console.log(data, "this is filled socketId");
      var arr = this.state.roomusers.slice();
      var arr2 = [...arr];
      for (var i = 0; i < arr2.length; i++) {
        if (data === arr2[i].socketId) {
          arr2[i].hp = 7;
        }
      }
      this.setState({
        roomusers: arr2
      });
    });

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
      this.state.roomusers.map(item => {
        if (item.socketId === data && this.props.myUserId === item.userId) {
          this._muteControl(data);
        }
      });
    });

    this._resetchat = () => {
      this.setState({
        roomusers: [],
        messages: []
      });
    };

    this._muteControl = socketId => {
      for (var i = 0; i < this.state.roomusers.length; i++) {
        if (
          this.state.roomusers[i].userId === this.props.myUserId &&
          this.state.roomusers[i].hp <= 4
        ) {
          this.setState({
            muteornot: true
          });
          if (this.state.mutepushcount < 1) {
            //Alert.alert("1분간 채팅이 금지되었습니다.");
            this.setState({
              mutepushcount: 1
            });
          }
          setTimeout(() => {
            // if (this.state.mutepushcount > 0) {
            //   Alert.alert("채팅 금지가 해제되었습니다!");
            // }
            this.setState({
              muteornot: false,
              mutepushcount: 0
            });
            this._socket.emit("fill", socketId);
          }, 10000);
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
      test: this._test,
      mutepushcount: 0
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
