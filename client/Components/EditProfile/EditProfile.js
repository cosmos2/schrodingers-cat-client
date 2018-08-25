import React from "react";
import { Text, View } from "react-native";
import Store from "../store";
import Cat from "../Cat/Cat";
import styles from "./styles";

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.images = {
      1: require("../img/cat1.png"),
      2: require("../img/cat2.png"),
      3: require("../img/cat3.png"),
      4: require("../img/cat4.png"),
      5: require("../img/cat5.png"),
      6: require("../img/cat6.png"),
      7: require("../img/cat7.png")
    };
    this.state = {
      socket: this.props.navigation.state.params.socket
    };
  }
  static navigationOptions = {
    title: "프로필 편집",
    headerStyle: {
      backgroundColor: "#FFAA0E",
      height: 60
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  render() {
    const upperCats = [1, 2, 3];
    const lowerCats = [4, 5, 6];
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.text}>고양이를 바꿀고양?</Text>
          </View>
          <View style={styles.catContainer}>
            <View style={styles.cats}>
              {upperCats.map(cat => (
                <Cat key={cat} id={cat} sendCatInfom={this._sendCatInfom} />
              ))}
            </View>
            <View style={styles.cats}>
              {lowerCats.map(cat => (
                <Cat key={cat} id={cat} sendCatInfom={this._sendCatInfom} />
              ))}
            </View>
            <Store.Consumer>
              {store => {
                return store.myInfo._enterCount > 40 ? (
                  <View style={styles.cats}>
                    <Cat key={7} id={7} sendCatInfom={this._sendCatInfom} />
                  </View>
                ) : null;
              }}
            </Store.Consumer>
          </View>
        </View>
      </View>
    );
  }
  _sendCatInfom = async (catId, store) => {
    try {
      await store.socket.emit("info", catId);
      await this.props.navigation.navigate("OpenBoxScreen");
    } catch (err) {
      console.log(err);
    }
  };
}