import React, { Component } from "react";
import { Text, View, AsyncStorage, Dimensions } from "react-native";
import Cat from "../Cat/Cat";
import styles from "./styles";
import Tutorial from "../Tutorial/Tutorial";

const { width, height } = Dimensions.get("window");

class SelectCat extends Component {
  static navigationOptions = {
    headerTitle: (
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontFamily: "Goyang", fontSize: 17, color: "white" }}>
          슈뢰딩거의 고양이에 온걸 환영한다옹
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#f4da6c",
      height: height * 0.07
    },
    headerLeft: null
  };

  // 고양이를 누르면 고양이 정보를 보내주고 화면을 넘김
  _sendCatInfom = async (catId, store) => {
    try {
      await store.socket.emit("info", catId);
      await AsyncStorage.removeItem("firstTime");
      await this.props.navigation.navigate("OpenBoxScreen");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const upperCats = [1, 2, 3];
    const lowerCats = [4, 5, 6, 8];
    return (
      <View style={styles.body}>
        <Tutorial />
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.text}>고양이를 고를고양</Text>
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
          </View>
        </View>
      </View>
    );
  }
}

export default SelectCat;
