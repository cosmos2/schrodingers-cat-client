import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from "react-native";
import Cat from "./Cat";

const { width, height } = Dimensions.get("window");

class SelectCat extends Component {
  static navigationOptions = {
    title: "슈뢰딩거의 고양이",
    headerStyle: {
      backgroundColor: "#FFAA0E",
      height: 60
    },
    headerLeft: null,
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
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FCFCFC"
  },
  container: {
    flex: 1,
    width: width * 0.8,
    height: height * 0.8
  },
  title: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  text: {
    fontWeight: "bold",
    fontFamily: "Goyang",
    fontSize: 30
  },
  catContainer: {
    flex: 0.7
  },
  cats: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default SelectCat;
