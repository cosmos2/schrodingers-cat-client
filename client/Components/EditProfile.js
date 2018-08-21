import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  AsyncStorage
} from "react-native";
import Store from "./store";
import Cat from "./Cat";

const { width, height } = Dimensions.get("window");

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.images = {
      1: require("./img/cat1.png"),
      2: require("./img/cat2.png"),
      3: require("./img/cat3.png"),
      4: require("./img/cat4.png"),
      5: require("./img/cat5.png"),
      6: require("./img/cat6.png")
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
  componentDidMount() {}

  render() {
    const upperCats = [1, 2, 3];
    const lowerCats = [4, 5, 6];
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.text}>고양이를 바꿀꺼야?</Text>
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
  _sendCatInfom = async (catId, store) => {
    try {
      await store.socket.emit("info", catId);
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
    // backgroundColor: "pink"
  }
});
