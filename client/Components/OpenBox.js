import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Store from "./store";

const { width, height } = Dimensions.get("window");
export default class OpenBox extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
    roomusers: []
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "상자 안에 고양이가 있을까요?",
      headerStyle: {
        backgroundColor: "#FFAA0E",
        height: 60
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: null,
      headerRightContainerStyle: { marginRight: 15 },
      headerRight: (
        <Store.Consumer>
          {store => {
            return (
              <TouchableOpacity
                onPress={() => params.openProfile(store.socket)}
              >
                <Image
                  source={require("./img/chartreux.png")}
                  style={{
                    marginBottom: 1
                  }}
                />
              </TouchableOpacity>
            );
          }}
        </Store.Consumer>
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ openProfile: this._openProfile });
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({
        latitude: lat,
        longitude: long
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Store.Consumer>
            {store => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this._findRoom(store.socket);
                  }}
                >
                  <Image
                    style={{ width: 300, height: 300 }}
                    source={{
                      uri:
                        "https://media1.tenor.com/images/2bbbd5be81fe0265103bfe25d16c7c8e/tenor.gif?itemid=12215186"
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          </Store.Consumer>
        </View>
      </View>
    );
  }
  _findRoom = async socket => {
    const { latitude, longitude } = this.state;
    try {
      await socket.emit("findRoom", { latitude, longitude });
      await this.props.navigation.navigate("LoadingScreen", { socket: socket });
    } catch (err) {
      console.log(err);
    }
  };
  _openProfile = async socket => {
    try {
      await socket.emit("info");
      await this.props.navigation.navigate("ProfileScreen");
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
  card: {
    paddingLeft: 20,
    flex: 0.6,
    width: width * 0.9
  }
});
