import React from "react";
import { Text, View, Dimensions } from "react-native";
import Store from "../store";
import Cat from "../Cat/Cat";
import styles from "./styles";

const { height } = Dimensions.get("window");

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.navigation.state.params.socket
    };
  }
  static navigationOptions = {
    headerTitle: (
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontFamily: "Goyang", fontSize: 17, color: "white" }}>
          프로필 편집
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#f4da6c",
      height: height * 0.07
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  _sendCatInfom = async (catId, store) => {
    try {
      await store.socket.emit("info", catId);
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
                return store.myInfo._enterCount > 100 ? (
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
}

export default EditProfile;
