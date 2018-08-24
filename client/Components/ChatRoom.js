import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  AsyncStorage,
  AppState
} from "react-native";
import { Icon } from "react-native-elements";
import AutoScroll from "react-native-auto-scroll";
import Images from "./img/catindex";
import Timer from "./Timer";
import Store from "./store";
import CatsList from "./CatsList";

const { width, height } = Dimensions.get("window");
export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      clearInput: false,
      myuserid: 10,
      mycatid: 0,
      chatroomcats: [],
      muteoneminutes: false,
      mychatroomnum: "",
      muteTime: 10,
      appState: AppState.currentState
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "고양이 발견!",
      headerStyle: {
        backgroundColor: "#FFAA0E",
        height: 60
      },
      headerLeftContainerStyle: { marginLeft: 10 },
      headerLeft: (
        <Store.Consumer>
          {store => {
            return (
              <Timer
                resetchat={store.resetchat}
                socket={store.socket}
                leftTime={store.leftTime}
                timeChanged={store.timeChanged}
                explodeChatRoom={params.explodeChatRoom}
              />
            );
          }}
        </Store.Consumer>
      ),
      headerRightContainerStyle: { marginRight: 15 },
      headerRight: (
        <Store.Consumer>
          {store => {
            return (
              <Icon
                onPress={() => params.exitChat(store)}
                type="ionicon"
                name="md-exit"
                color="white"
                iconStyle={{ paddingLeft: 10 }}
              />
            );
          }}
        </Store.Consumer>
      ),
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  componentWillUpdate() {
    // if (context.muteornot && !context.disconnectornot) {
    //   this.props.navigation.navigate("MuteScreen");
    // } else if (!context.muteornot && context.disconnectornot) {
    //   this.props.navigation.navigate("DisconnectScreen");
    // } else {
    //   this.props.navigation.navigate("ChatRoomScreen");
    // }
    context.muteornot
      ? this.props.navigation.navigate("MuteScreen")
      : this.props.navigation.navigate("ChatRoomScreen");
  }

  // componentDidUpdate() {
  //   context.disconnectornot
  //     ? this.props.navigation.navigate("DisconnectScreen")
  //     : null;
  // }

  componentWillMount() {
    this._whoamI();
    this._myuserinfo();
  }
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.props.navigation.setParams({
      exitChat: this._exitChat,
      explodeChatRoom: this._explodeChatRoom
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatroom}>
          <AutoScroll style={styles.chats}>
            <View>
              <Store.Consumer>
                {store => {
                  context = store;
                  return store.messages.map((item, i) => {
                    return this.state.myuserid !== item.userId ? (
                      <View style={{ flexDirection: "row" }} key={i}>
                        <Image
                          source={Images[item.catId]}
                          style={{
                            marginTop: 5,
                            marginLeft: 5
                          }}
                        />
                        <View style={styles.eachotherschat}>
                          <Text style={styles.chatfont}>
                            {item.userId} : {item.message}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.mychat} key={i}>
                        <View style={styles.eachmychat}>
                          <Text style={styles.chatfont}>
                            {item.userId} : {item.message}
                          </Text>
                        </View>
                      </View>
                    );
                  });
                }}
              </Store.Consumer>
            </View>
          </AutoScroll>
          <View style={styles.chatinput}>
            <Store.Consumer>
              {store => {
                return (
                  <TextInput
                    style={styles.textInput}
                    editable={store.muteornot ? false : true}
                    multiline={false}
                    value={!this.state.clearInput ? this.state.message : null}
                    onChangeText={message => {
                      this.setState({ message: message, clearInput: false });
                    }}
                    returnKeyType="done"
                    autoCorrect={false}
                    onSubmitEditing={() => {}}
                  />
                );
              }}
            </Store.Consumer>
            <Store.Consumer>
              {store => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      {
                        store.muteornot
                          ? Alert.alert("1분간 채팅 금지")
                          : this._sendMessage(store.socket, this.state.message);
                      }
                    }}
                  >
                    <Image
                      source={require("./img/sendprint.png")}
                      style={{
                        marginBottom: 10,
                        marginLeft: 10
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            </Store.Consumer>
          </View>
        </View>
        <View style={styles.options}>
          <Text style={styles.statetext}>Cats in the Room</Text>
          <View style={styles.catsstate}>
            <View style={styles.statespace}>
              <Store.Consumer>
                {store => {
                  return <CatsList myuserid={this.state.myuserid} />;
                }}
              </Store.Consumer>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _sendMessage = (socket, message) => {
    if (message.length > 0) {
      this.setState({
        clearInput: !this.state.clearInput,
        message: ""
      });

      socket.emit("chat", {
        message: message,
        userId: this.state.myuserid,
        catImage: this.state.mycatid
      });
    }
  };

  _whoamI = () => {
    for (var key in this.state.chatroomcats) {
      if (this.state.chatroomcats[key]["userId"] === this.state.myuserid) {
        this.setState({
          mychatroomnum: key
        });
      }
    }
  };

  _myuserinfo = async () => {
    var myuserid = await AsyncStorage.getItem("myUserId");
    myuserid = JSON.parse(myuserid);
    this.setState({
      myuserid: myuserid["userId"],
      mycatid: myuserid["catId"]
    });
  };

  _exitChat = store => {
    Alert.alert(
      "채팅방을 나가시겠습니까?",
      "",
      [
        {
          text: "나가기",
          onPress: () => {
            store.socket.emit("leaveRoom");
            store.resetchat();
            this.props.navigation.navigate("OpenBoxScreen");
          }
        },
        { text: "취소" }
      ],
      { cancelable: false }
    );
  };

  // Timer 에서 쓰임. 타임아웃되면 화면 전환
  _explodeChatRoom = () => {
    this.props.navigation.navigate("OpenBoxScreen");
  };

  // 앱이 백그라운드에서 다시 돌아왔을 때 실행
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      context.socket.emit("leftTime");
    }
    this.setState({ appState: nextAppState });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  catsstate: {
    flex: 1,
    width: width * 0.9,
    alignItems: "center"
  },
  statetext: {
    color: "black",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  statespace: {
    width: width * 0.96,
    flex: 1,
    margin: 5
  },
  mychat: {
    alignItems: "flex-end"
  },
  chatfont: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  eachmychat: {
    width: width * 0.7,
    borderRadius: 10,
    margin: 5,
    padding: 8,
    alignItems: "flex-end",
    backgroundColor: "#F4E39D",
    flexDirection: "row"
  },
  eachotherschat: {
    margin: 5,
    padding: 8,
    width: width * 0.7,
    borderRadius: 10,
    backgroundColor: "#C4E1DE",
    flexDirection: "row"
  },

  chatroom: {
    flex: 1,
    width: width,
    margin: 5
  },
  options: {
    flex: 0.6,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: width * 0.83,
    height: height * 0.05,
    marginLeft: 10
  },
  chats: {
    flex: 1,
    marginBottom: 5
  },
  chatinput: {
    flex: 0.1,
    flexDirection: "row"
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "500",
    fontWeight: "bold"
  }
});
