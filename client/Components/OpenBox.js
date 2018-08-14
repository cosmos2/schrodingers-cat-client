import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");
export default class OpenBox extends React.Component {
  state = {
    latitude: 0,
    longitude: 0
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
      headerRightContainerStyle: { marginRight: 15 },
      headerRight: (
        <TouchableOpacity onPress={() => params.openProfile()}>
          <Image
            source={require("./img/chartreux.png")}
            style={{
              marginBottom: 1
            }}
          />
        </TouchableOpacity>
        // <Icon
        //   onPress={() => params.openProfile()}
        //   type="ionicon"
        //   name="logo-octocat"
        //   color="white"
        // />
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
          <TouchableOpacity onPress={this._findRoom}>
            <Image
              style={{ width: 300, height: 300 }}
              source={{
                uri:
                  "https://media1.tenor.com/images/2bbbd5be81fe0265103bfe25d16c7c8e/tenor.gif?itemid=12215186"
              }}
            />
          </TouchableOpacity>
          {/* <Button
            title="Open Box"
            onPress={() => this.props.navigation.navigate("LoadingScreen")}
          /> */}
        </View>
      </View>
    );
  }
  _findRoom = () => {
    Alert.alert(
      "위도 : " + JSON.stringify(this.state.latitude),
      "경도 : " + JSON.stringify(this.state.longitude)
    );
    this.props.navigation.navigate("LoadingScreen");
  };
  _openProfile = () => {
    //Alert.alert("fuck");
    this.props.navigation.navigate("ProfileScreen");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    paddingLeft: 20,
    flex: 0.6,
    //backgroundColor: "yellow",
    // borderWidth: 1,
    // borderColor: "black",
    width: width * 0.9
  }
});
