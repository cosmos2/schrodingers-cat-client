import React from "react";
import { AsyncStorage, Vibration } from "react-native";
import SelectCat from "./Components/SelectCat/SelectCat";
import OpenBox from "./Components/OpenBox/OpenBox";
import Profile from "./Components/Profile/Profile";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import Loading from "./Components/Loading/Loading";
import Landing from "./Components/Landing/Landing";
import Cat from "./Components/Cat/Cat";
import { createStackNavigator } from "react-navigation";
import { Font } from "expo";
import Store from "./Components/store";
import SocketIOClient from "socket.io-client";
import EditProfile from "./Components/EditProfile/EditProfile";
import Mute from "./Components/Mute/Mute";
import Disconnect from "./Components/Disconnect/Disconnect";

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
    MuteScreen: { screen: Mute },
    DisconnectScreen: { screen: Disconnect }
  },
  {
    initialRouteName: "LandingScreen",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
const thisroomcats = "";
class AppPresenter extends React.Component {
  constructor(props) {
    super(props);

    // <--------------          socket start          --------------> //

    // 소켓 연결
    this._socket = SocketIOClient("https://catadmin.gq", {
      query: this.props.token,
      transports: ["websocket"]
    });

    // 프로필에 들어갈 때 유저 정보를 받아올 때 사용
    this._socket.on("info", myInfo => {
      this.setState({
        myInfo
      });
    });

    // 채팅방 입장할 때 채팅방의 정보를 받아옴
    this._socket.on("findRoom", (users, leftTime) => {
      const time = 100 + leftTime - Math.floor(new Date().getTime() / 1000);
      this.setState({
        roomusers: JSON.parse(users),
        organizedTime: time,
        leftTime,
        typing: ""
      });
    });

    // 소켓과의 연결이 끝어졌을 때 채팅 관련 정보를 지움
    this._socket.on("disconnect", async () => {
      await this.setState({
        disconnectornot: true
      });
      await this._resetchat();
    });

    this._socket.on("leaveRoom", users => {
      this.setState({
        roomusers: JSON.parse(users)
      });
    });

    //"chat"으로 들어온 정보를 messages 라는 배열에 저장하기 위함
    this._socket.on("chat", data => {
      this._storemessage({
        nickname: data.nickname,
        userId: data.userId,
        catId: data.catImage,
        message: data.message
      });
    });

    // 고양이 아이디와 함께 info 이밴트 발생시 유저 정보를 받아온다
    this._socket.on("selectCat", userInfo => {
      this._getUserInfo(userInfo);
    });

    // 펀치를 날렸을 때 발생
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

    // 채팅방 시간이 다 되었을 때 발생
    this._socket.on("timeOut", () => {
      this.setState({
        chatOver: true
      });
    });

    // 누군가 타이핑을 하고 있을 때 발생
    this._socket.on("typing", data => {
      this.setState({
        typing: data.nickname + "is typing"
      });
    });

    // 뮤트 이후에 hp 회복
    this._socket.on("fill", data => {
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

    // 채팅중에 앱이 inactive 였다가 다시 active 되었을 때 남은 시간을 받아옴
    // this._socket.on("leftTime", leftTime => {
    //   this.setState({ leftTime });
    // });

    // <-------------------           socket end           -------------------> //

    // <-------------------           function start           -------------------> //

    //새로 들어온 채팅을 추가해 messages라는 state에 저장하기 위함
    this._storemessage = chat => {
      const arr = this.state.messages;
      arr.push(chat);
      this.setState({
        messages: arr
      });
      if (chat.nickname + "is typing" === this.state.typing) {
        this.setState({
          typing: thisroomcats
        });
      }
    };

    this._getUserInfo = async userInfo => {
      try {
        const myInfo = {
          userId: userInfo.userId,
          catId: userInfo.catImage,
          nickname: userInfo.nickname
        };
        await AsyncStorage.setItem("myUserId", JSON.stringify(myInfo));
        await this.setState({
          myUserId: userInfo.userId
        });
      } catch (err) {
        console.log(err);
      }
    };

    this._resetchat = () => {
      this.setState({
        roomusers: [],
        messages: []
      });
    };

    this._disconnectControl = () => {
      this.setState({
        disconnectornot: false
      });
    };

    this._muteControl = socketId => {
      Vibration.vibrate(100);
      for (var i = 0; i < this.state.roomusers.length; i++) {
        if (
          this.state.roomusers[i].userId === this.props.myUserId &&
          this.state.roomusers[i].hp <= 0
        ) {
          this.setState({
            muteornot: true
          });
          setTimeout(() => {
            this.setState({
              muteornot: false
            });
            this._socket.emit("fill", socketId);
          }, 10000);
        }
      }
    };

    this._myuserinfo = async () => {
      var myuserid = await AsyncStorage.getItem("myUserId");
      myuserid = JSON.parse(myuserid);
      this.setState({
        myuserid: myuserid["userId"],
        mycatid: myuserid["catId"],
        mynickname: myuserid["nickname"]
      });
    };

    // <-------------------           function end           -------------------> //

    this.state = {
      fontLoaded: false,
      socket: this._socket,
      roomusers: [],
      myInfo: {},
      messages: [],
      leftTime: "",
      resetchat: this._resetchat,
      muteornot: false,
      mutepushcount: 0,
      disconnectornot: false,
      disconnectcontrol: this._disconnectControl,
      chatOver: false,
      typing: thisroomcats,
      organizedTime: "",
      myuserid: 0
    };
  }

  async componentDidMount() {
    await this._myuserinfo();
    await Font.loadAsync({
      Goyang: require("./assets/fonts/Goyang.otf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.disconnectornot ? (
      <Store.Provider value={this.state}>
        <Disconnect />
      </Store.Provider>
    ) : this.state.fontLoaded ? (
      <Store.Provider value={this.state}>
        <AppNavigator />
      </Store.Provider>
    ) : null;
  }
}

export default AppPresenter;
