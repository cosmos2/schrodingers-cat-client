import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";

export default class Loading extends Component {
  state = {
    latitude: 0,
    longitude: 0
  };
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    // Start counting when the page is loaded
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({
        latitude: lat,
        longitude: long
      });
    });
    this.timeoutHandle = setTimeout(() => {
      // Alert.alert(
      //   "위도 : " + JSON.stringify(this.state.latitude),
      //   "경도 : " + JSON.stringify(this.state.longitude)
      // );
      this.props.navigation.navigate("SelectCatScreen");
    }, 50);
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

  _userInfo = () => {
    //db로 위도, 경도, 토큰 보내주기
    if (this.state.latitude === "" || this.state.longitude === "") {
      return;
    }
    fetch("link", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude
      })
    });
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
