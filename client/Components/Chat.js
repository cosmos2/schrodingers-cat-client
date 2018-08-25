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
  AsyncStorage
} from "react-native";
import { Icon } from "react-native-elements";
import AutoScroll from "react-native-auto-scroll";
import Images from "./img/catindex";
import Store from "./store";
import ChatInput from "./ChatInput";

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
      mynickname: ""
    };
  }

  componentWillMount() {
    //this._whoamI();
    this._myuserinfo();
  }
  render() {
    return (
      <View style={styles.container}>
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
                          {item.nickname} : {item.message}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.mychat} key={i}>
                      <View style={styles.eachmychat}>
                        <Text style={styles.chatfont}>{item.message}</Text>
                      </View>
                    </View>
                  );
                });
              }}
            </Store.Consumer>
          </View>
        </AutoScroll>
        <View style={styles.chatinput}>
          <ChatInput />
        </View>
      </View>
    );
  }

  _myuserinfo = async () => {
    var myuserid = await AsyncStorage.getItem("myUserId");
    myuserid = JSON.parse(myuserid);
    this.setState({
      myuserid: myuserid["userId"],
      mycatid: myuserid["catId"],
      mynickname: myuserid["nickname"]
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mychat: {
    alignItems: "flex-end"
    //backgroundColor: "red"
  },
  chatfont: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  eachmychat: {
    //width: width * 0.7,
    borderRadius: 10,
    margin: 5,
    padding: 8,
    justifyContent: "flex-end",
    backgroundColor: "#F4E39D",
    flexDirection: "row"
    //backgroundColor: "red"
  },
  eachotherschat: {
    margin: 5,
    padding: 8,
    //width: width * 0.7,
    borderRadius: 10,
    backgroundColor: "#C4E1DE",
    flexDirection: "row"
  },
  chats: {
    flex: 1,
    marginBottom: 5,
    width: width
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
