import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class Loading extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate("ChatRoomScreen", {
        socket: this.props.navigation.state.params.socket
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading</Text>
        <Image
          style={{ width: 300, height: 300 }}
          source={{
            uri: "https://media.giphy.com/media/l2QE861VOZU7zQdDG/giphy.gif"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "black",
    fontSize: 50,
    marginTop: 10,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: "Goyang"
  }
});
