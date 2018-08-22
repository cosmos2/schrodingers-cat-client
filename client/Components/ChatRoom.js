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
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import { Icon } from "react-native-elements";
import AutoScroll from "react-native-auto-scroll";
import Images from "./img/catindex";
import CatsState from "./CatsState";
import Timer from "./Timer";
import Store from "./store";
import CatsList from "./CatsList";

const { width, height } = Dimensions.get("window");
export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    //this.socket = this.props.navigation.state.params.socket;
    //this.roomusers = this.props.navigation.state.params.roomusers;
    this.state = {
      messages: [
        // { userId: 215, catId: 1, message: "fucking crazy Lotteria!!!" },
        // { userId: 123, catId: 1, message: "Umm Mcdonald is the best!!!" },
        // { userId: 87, catId: 1, message: "BurgerKing is Cool!!" },
        // { userId: 123, catId: 1, message: "Hi my name is monkey" },
        // { userId: 215, catId: 1, message: "I am Genius" },
        // { userId: 87, catId: 2, message: "oh you looks like koala" },
        // { userId: 123, catId: 1, message: "fucking crazy Lotteria!!!" },
        // { userId: 87, catId: 2, message: "Umm Mcdonald is the best!!!" },
        // { userId: 215, catId: 1, message: "BurgerKing is Cool!!" },
        // { userId: 123, catId: 1, message: "Hi my name is monkey" },
        // { userId: 215, catId: 1, message: "I am Genius" },
        // { userId: 87, catId: 2, message: "oh you looks like koala" }
      ],
      message: "",
      clearInput: false,
      myuserid: 10,
      mycatid: 0,
      chatroomcats: [],
      muteoneminutes: false,
      mychatroomnum: ""
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
                onPress={() => params.exitChat(store.socket, store.resetchat)}
                type="ionicon"
                name="md-exit"
                color="white"
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
    context.muteornot
      ? this.props.navigation.navigate("MuteScreen")
      : this.props.navigation.navigate("ChatRoomScreen");
  }
  componentWillMount() {
    this._whoamI();
    this._myuserinfo();
  }
  componentDidMount() {
    this.props.navigation.setParams({
      exitChat: this._exitChat,
      explodeChatRoom: this._explodeChatRoom
      // <-- I think explodeChatRoom is useless
    });
    //this._amImute();
  }

  render() {
    // console.log("render");
    // console.log(this.state.myuserid, "myuserid");
    return (
      <View style={styles.container}>
        <View style={styles.chatroom}>
          <AutoScroll style={styles.chats}>
            <View>
              <Store.Consumer>
                {store => {
                  context = store;
                  //console.log(store.messages, "coming message");
                  return store.messages.map((item, i) => {
                    //console.log(item.message, "just message");
                    // const catId =
                    //   "./img/cat" + JSON.stringify(item.catId) + ".png";
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
            {/* <Text>Chat Room</Text> */}
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
                    onSubmitEditing={() => {
                      //this._sendMessage(this.state.message);
                    }}
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
              <CatsList myuserid={this.state.myuserid} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  _sendMessage = (socket, message) => {
    //Alert.alert(this.state.message);
    if (message.length > 0) {
      this.setState({
        clearInput: !this.state.clearInput,
        message: ""
      });
      console.log("send Message");

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

  // _amImute = () => {

  //   for (var key in this.state.chatroomcats) {
  //     if (
  //       this.state.chatroomcats[key]["userId"] === this.state.myuserid &&
  //       this.state.chatroomcats[key]["hp"] === 0
  //     ) {
  //       Alert.alert("1분간 채팅이 금지 되었습니다.");
  //       this.setState({
  //         muteoneminutes: true
  //       });
  //       setTimeout(() => {
  //         Alert.alert("채팅 금지가 해제되었습니다!");
  //         this.setState({
  //           muteoneminutes: false
  //         });
  //         //서버에 hp 채우기 요청 보내기
  //       }, 15000);
  //     }
  //   }
  // };

  _myuserinfo = async () => {
    var myuserid = await AsyncStorage.getItem("myUserId");
    myuserid = JSON.parse(myuserid);
    this.setState({
      myuserid: myuserid["userId"],
      mycatid: myuserid["catId"]
    });
  };

  _exitChat = (socket, resetchat) => {
    Alert.alert(
      "채팅방을 나가시겠습니까?",
      "",
      [
        {
          text: "나가기",
          onPress: () => {
            socket.emit("leaveRoom");
            resetchat();
            this.props.navigation.navigate("OpenBoxScreen");
          }
        },
        { text: "취소" }
      ],
      { cancelable: false }
    );
  };
  _explodeChatRoom = () => {
    this.props.navigation.navigate("OpenBoxScreen");
  };
  // <--- Timer에서 쓰임
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
    //backgroundColor: "yellow",
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
    //justifyContent: "flex-end"
    alignItems: "flex-end"
  },
  chatfont: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  eachmychat: {
    width: width * 0.7,
    // borderWidth: 1,
    // borderColor: "black",
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
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#C4E1DE",
    flexDirection: "row"
  },

  chatroom: {
    flex: 1,
    //backgroundColor: "red",
    width: width,
    margin: 5
    // borderWidth: 1,
    // borderColor: "black"
    //justifyContent: "flex-end"
  },
  options: {
    flex: 0.6,
    //backgroundColor: "yellow",
    width: width * 0.9,
    // borderWidth: 1,
    // borderColor: "black",
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
    // borderWidth: 1,
    // borderColor: "black",
    marginBottom: 5
    //backgroundColor: "red"
  },
  chatinput: {
    flex: 0.1,
    flexDirection: "row"
    //backgroundColor: "blue"
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "500",
    fontWeight: "bold"
    //marginBottom: 10
  }
});

// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   AsyncStorage,
//   KeyboardAvoidingView,
//   TextInput
// } from "react-native";
// class test extends Component {
//   render() {
//     return (
//       <KeyboardAvoidingView style={styles.container} behavior="padding">
//         <View style={styles.upper}>
//           <Text>hi</Text>
//           <TextInput style={styles.textInput} />
//         </View>
//         <View style={styles.lower}>
//           <Text>hi</Text>
//           <TextInput style={styles.textInput} />
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }

// export default test;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FCFCFC",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   title: {
//     color: "#FFAA0E",
//     fontFamily: "Goyang",
//     fontSize: 30,
//     marginTop: 10,
//     fontWeight: "900",
//     marginBottom: 10
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "black"
//   },
//   upper: {
//     backgroundColor: "yellow",
//     flex: 1,
//     width: 300
//   },
//   lower: {
//     backgroundColor: "green",
//     flex: 1,
//     width: 300
//   }
// });
