import React from "react";
import { Text, View, Image, AsyncStorage } from "react-native";
import AutoScroll from "react-native-auto-scroll";
import Images from "../../assets/img/catindex";
import Store from "../store";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./styles";

class Chat extends React.Component {
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

  componentDidMount() {
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
                          width: 32,
                          height: 32,
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
        <Store.Consumer>
          {store => {
            return <Text style={styles.statetext}>{store.typing}</Text>;
          }}
        </Store.Consumer>
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

export default Chat;
