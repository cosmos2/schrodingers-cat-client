import React from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage
} from "react-native";
import Store from "../store";
import styles from "./styles";

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      clearInput: false,
      myuserid: 10,
      mycatid: 0,
      mynickname: ""
    };
  }

  componentWillMount() {
    this._myuserinfo();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatinput}>
          <Store.Consumer>
            {store => {
              return (
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid={"transparent"}
                  editable={store.muteornot ? false : true}
                  multiline={false}
                  value={!this.state.clearInput ? this.state.message : null}
                  onChangeText={message => {
                    this.setState({ message: message, clearInput: false });
                    if (this.state.message.length !== 0) {
                      store.socket.emit("typing", {
                        nickname: this.state.mynickname
                      });
                    }
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
                        ? Alert.alert("잠시 쉬라옹")
                        : this._sendMessage(store.socket, this.state.message);
                    }
                  }}
                >
                  <View>
                    <Image
                      source={require("../../assets/img/arrow2.png")}
                      style={{
                        marginRight: 3,
                        marginTop: 1,
                        width: 32,
                        height: 32
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          </Store.Consumer>
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
        catImage: this.state.mycatid,
        nickname: this.state.mynickname
      });
    }
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
}

export default ChatInput;
