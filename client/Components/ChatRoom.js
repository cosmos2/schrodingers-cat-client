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
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import Images from "./img/catindex";
import CatsState from "./CatsState";
import Timer from "./Timer";

const { width, height } = Dimensions.get("window");
export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        { userId: 123, catId: 1, message: "fucking crazy Lotteria!!!" },
        { userId: 87, catId: 2, message: "Umm Mcdonald is the best!!!" },
        { userId: 10, catId: 4, message: "BurgerKing is Cool!!" },
        { userId: 123, catId: 1, message: "Hi my name is monkey" },
        { userId: 10, catId: 4, message: "I am Genius" },
        { userId: 87, catId: 2, message: "oh you looks like koala" },
        { userId: 123, catId: 1, message: "fucking crazy Lotteria!!!" },
        { userId: 87, catId: 2, message: "Umm Mcdonald is the best!!!" },
        { userId: 10, catId: 4, message: "BurgerKing is Cool!!" },
        { userId: 123, catId: 1, message: "Hi my name is monkey" },
        { userId: 10, catId: 4, message: "I am Genius" },
        { userId: 87, catId: 2, message: "oh you looks like koala" }
      ],
      message: "",
      clearInput: false,
      myuserid: 10,
      chatroomcats: {
        cat1: { userId: 123, catId: 1, hp: 7 },
        cat2: { userId: 87, catId: 2, hp: 7 },
        cat3: { userId: 10, catId: 4, hp: 7 }
      },
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
      headerLeft: <Timer explodeChatRoom={params.explodeChatRoom} />,
      headerRightContainerStyle: { marginRight: 15 },
      headerRight: (
        <Icon
          onPress={() => params.exitChat()}
          type="ionicon"
          name="md-exit"
          color="white"
        />
      ),
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  componentWillMount() {
    this._whoamI();
    this._amImute();
  }
  componentDidMount() {
    this.props.navigation.setParams({
      exitChat: this._exitChat,
      explodeChatRoom: this._explodeChatRoom
      // <-- I think explodeChatRoom is useless
    });

    //this._myuserinfo();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatroom}>
          <ScrollView style={styles.chats}>
            {/* <Text>{JSON.stringify(this.state.clearInput)}</Text> */}
            {this.state.messages.map((item, i) => {
              const catId = "./img/cat" + JSON.stringify(item.catId) + ".png";
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
            })}
          </ScrollView>
          <View style={styles.chatinput}>
            {/* <Text>Chat Room</Text> */}
            <TextInput
              style={styles.textInput}
              editable={this.state.muteoneminutes ? false : true}
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
            <TouchableOpacity
              onPress={() => {
                {
                  this.state.muteoneminutes
                    ? Alert.alert("1분간 채팅 금지")
                    : this._sendMessage(this.state.message);
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
          </View>
        </View>
        <View style={styles.options}>
          <View style={styles.catsstate}>
            <View style={styles.statespace}>
              <CatsState
                //chatRoomCats={this.state.chatroomcats}
                myChatRoomNum={this.state.mychatroomnum}
                // socket={this.socket}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  _sendMessage = message => {
    Alert.alert(this.state.message);
    if (message.length > 0) {
      this.setState({
        clearInput: !this.state.clearInput,
        message: ""
      });
      console.log("send Message");
    }
    //this.socket.emit("message", { message: message, userId: this.state.name });
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

  _amImute = () => {
    console.log("fucking");
    //console.log(this.state.chatroomcats);
    for (var key in this.state.chatroomcats) {
      //   console.log(this.state.chatroomcats[key]["userId"], "this is key.userID");
      //   console.log(this.state.myuserid, "this is mine");
      if (
        this.state.chatroomcats[key]["userId"] === this.state.myuserid &&
        this.state.chatroomcats[key]["hp"] === 0
      ) {
        Alert.alert("1분간 채팅이 금지 되었습니다.");
        this.setState({
          muteoneminutes: true
          //   mychatroomnum: key
        });
        //console.log(this.state.muteoneminutes, "i am muted!!");
        setTimeout(() => {
          Alert.alert("채팅 금지가 해제되었습니다!");
          this.setState({
            muteoneminutes: false
          });
          //서버에 hp 채우기 요청 보내기
          //console.log(this.state.muteoneminutes, "i can Chat!!!");
        }, 15000);
      }
    }
  };
  _storemessage = message => {
    const arr = this.state.messages;
    arr.push(message);
    this.setState({
      messages: arr
    });
  };

  _myuserinfo = async () => {
    const myuserid = await AsyncStorage.getItem("myUserId");
    this.setState({
      myuserid: myuserid
    });
  };

  _exitChat = () => {
    Alert.alert(
      "채팅방을 나가시겠습니까?",
      "",
      [
        {
          text: "나가기",
          onPress: () => {
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
