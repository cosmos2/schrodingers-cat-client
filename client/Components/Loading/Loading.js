import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Store from "../store";
import styles from "./styles";

class Loading extends Component {
  state = {
    latitude: null,
    longitude: null,
    loaded: false
  };
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    if (!this.state.loaded) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loaded: true
          });
        },
        error => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }
  async componentDidUpdate() {
    if (this.state.loaded) {
      const { latitude, longitude } = this.state;
      await this.setState({ latitude: null, longitude: null, loaded: false });
      await socket.emit("findRoom", { latitude, longitude });
      await this.props.navigation.navigate("ChatRoomScreen");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>주변 고양이를 찾는중!!</Text>
        <Store.Consumer>
          {store => {
            socket = store.socket;
          }}
        </Store.Consumer>
        <Image
          style={{ width: 250, height: 250 }}
          source={require("../../assets/img/loading.gif")}
        />
      </View>
    );
  }
}

export default Loading;
