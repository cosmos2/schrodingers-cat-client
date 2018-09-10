import React from "react";
import { Text, View, Image } from "react-native";
import AutoScroll from "react-native-auto-scroll";
import Images from "../../assets/img/catindex";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./styles";

const Chat = props => {
  return (
    <View style={styles.container}>
      <AutoScroll style={styles.chats}>
        <View>
          {props.store.messages.map(
            (item, i) =>
              props.store.myuserid !== item.userId ? (
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
              )
          )}
        </View>
      </AutoScroll>
      <Text style={styles.statetext}>{props.store.typing}</Text>
      <View style={styles.chatinput}>
        <ChatInput />
      </View>
    </View>
  );
};

export default Chat;
