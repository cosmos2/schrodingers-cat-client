import React from "react";
import {
  Text,
  View,
  Alert,
  AsyncStorage,
  AppState,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import Timer from "../Timer";
import Store from "../store";
import CatsList from "../CatsList/CatsList";
import Chat from "../Chat/Chat";
import styles from "./styles";

const { height } = Dimensions.get("window");

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myuserid: 0,
      mycatid: 0,
      mynickname: "",
      appState: AppState.currentState,
      muteornot: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontFamily: "Goyang", fontSize: 17, color: "white" }}>
            반갑다옹
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#f4da6c",
        height: height * 0.07
      },
      headerLeftContainerStyle: { marginLeft: 10 },
      headerLeft: <Timer explodeChatRoom={params.explodeChatRoom} />,
      headerRightContainerStyle: { marginRight: 15 },
      headerRight: (
        <Icon
          onPress={() => params.exitChat(context)}
          type="ionicon"
          name="md-exit"
          color="white"
          iconStyle={{ paddingLeft: 10 }}
        />
      ),
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  _myuserinfo = async () => {
    var myuserid = await AsyncStorage.getItem("myUserId");
    myuserid = JSON.parse(myuserid);
    this.setState({
      myuserid: myuserid["userId"],
      mycatid: myuserid["catId"],
      mynickname: myuserid["nickname"]
    });
  };

  _exitChat = store => {
    Alert.alert(
      "고양이들을 떠날고양?",
      "",
      [
        {
          text: "떠날고양",
          onPress: () => {
            store.socket.emit("leaveRoom");
            store.resetchat();
            this.props.navigation.navigate("OpenBoxScreen");
          }
        },
        { text: "더 있을고양" }
      ],
      { cancelable: false }
    );
  };

  // Timer 에서 쓰임. 타임아웃되면 화면 전환
  _explodeChatRoom = () => {
    this.props.navigation.navigate("OpenBoxScreen");
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("CDU");
    context.muteornot
      ? this.props.navigation.navigate("MuteScreen")
      : this.props.navigation.navigate("ChatRoomScreen");
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {
    console.log(context.myuserid, "myuserid");
    this._myuserinfo();
    this.props.navigation.setParams({
      exitChat: this._exitChat,
      explodeChatRoom: this._explodeChatRoom
    });
  }
  render() {
    console.log("render");
    return (
      <Store.Consumer>
        {store => {
          context = store;
          return (
            <View style={styles.container}>
              <View style={styles.chatroom}>
                <Chat store={store} />
              </View>
              <View style={styles.options}>
                <View style={styles.catsstate}>
                  <View style={styles.statespace}>
                    <CatsList myuserid={store.myuserid} />
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      </Store.Consumer>
    );
  }
}

export default ChatRoom;
