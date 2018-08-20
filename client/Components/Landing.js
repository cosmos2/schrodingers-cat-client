import React, { Component } from "react";

import { View, Text, Image, StyleSheet, AsyncStorage } from "react-native";

export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this._userInfo();
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>슈뢰딩거의 고양이</Text>
        <Image
          style={{ width: 300, height: 300 }}
          source={{
            uri: "https://i.gifer.com/1Kto.gif"
          }}
        />
      </View>
    );
  }
  _userInfo = async () => {
    //위도, 경도, 토큰 보내주기
    try {
      const firstTime = await AsyncStorage.getItem("firstTime");
      if (firstTime === "firstTime") {
        this.props.navigation.navigate("SelectCatScreen");
      } else {
        this.props.navigation.navigate("OpenBoxScreen");
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#FFAA0E",
    fontFamily: "Goyang",
    fontSize: 30,
    marginTop: 10,
    fontWeight: "900",
    marginBottom: 10
  }
});
