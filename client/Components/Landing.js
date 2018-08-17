import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  AsyncStorage,
  Button
} from "react-native";
import SocketIOClient from "socket.io-client";
import Store from "./store";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    //this.socket = SocketIOClient("http://localhost:3000");
  }

  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    // Start counting when the page is loaded
    //this._what();
    // navigator.geolocation.getCurrentPosition(position => {
    //   var lat = parseFloat(position.coords.latitude);
    //   var long = parseFloat(position.coords.longitude);
    //   this.setState({
    //     latitude: lat,
    //     longitude: long
    //   });
    // });
    this.timeoutHandle = setTimeout(() => {
      // Alert.alert(
      //   "위도 : " + JSON.stringify(this.state.latitude),
      //   "경도 : " + JSON.stringify(this.state.longitude)
      // );
      this._userInfo();
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  render() {
    return (
      <View style={styles.container}>
        <Store.Consumer>
          {store => (
            <Button
              onPress={() => {
                this._monkey(store);
              }}
              title="see store"
              color="#841584"
            />
          )}
        </Store.Consumer>
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

  //   _what = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     console.log(token);
  //   };
  _monkey = something => {
    something.emit("msg", "fucking");
  };
  _userInfo = async () => {
    //위도, 경도, 토큰 보내주기
    await AsyncStorage.setItem("token", "");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        this.props.navigation.navigate("SelectCatScreen");
      } else {
        // this.socket.emit("", token);
        // this.socket.on("", userinfo=>{
        //     await AsyncStorage.setItem("userInfo", JSON.stringify(userinfo));
        // })
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
