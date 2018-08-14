import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Icon } from "react-native-elements";

export default class ChatRoom extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "고양이 발견!",
      headerStyle: {
        backgroundColor: "#FFAA0E",
        height: 60
      },
      headerLeftContainerStyle: { marginLeft: 10, backgroundColor: "yellow" },
      headerLeft: null,
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
  componentDidMount() {
    this.props.navigation.setParams({ exitChat: this._exitChat });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat Room</Text>
      </View>
    );
  }
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
  //   _goBacktoOpenBox = () => {

  //   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
