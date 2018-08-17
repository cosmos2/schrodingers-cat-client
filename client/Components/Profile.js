import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  AsyncStorage
} from "react-native";
import Loading from "./Loading";

const { width, height } = Dimensions.get("window");

export default class Profile extends React.Component {
  state = {
    loading: false
  };
  static navigationOptions = {
    title: "고양이 프로필",
    headerStyle: {
      backgroundColor: "#FFAA0E",
      height: 60
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  async componentDidMount() {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      await console.log(userInfo);
      await this.setState({ loading: true });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return this.state.loading ? (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.profilecat}>
            <Image source={require("./img/catDemo.png")} />
          </View>
          <View style={styles.userinfo}>
            <Text style={styles.subtitle}>ID : #1234</Text>
            <Text style={styles.subtitle}>맞은 횟수 : 67</Text>
            <Text style={styles.subtitle}>채팅 입장 횟수 : 145</Text>
            <Text style={styles.subtitle}>뮤트된 횟수 : 12</Text>
          </View>
        </View>
      </View>
    ) : (
      <Loading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    alignItems: "center",
    justifyContent: "center"
  },
  profilecat: {
    marginTop: 40,
    marginBottom: 30,
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  userinfo: {
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 20,
    fontFamily: "Goyang",
    fontWeight: "500",
    fontWeight: "bold"
    //marginBottom: 10
  },
  title: {
    color: "black",
    fontSize: 50,
    marginTop: 10,
    fontWeight: "700",
    marginBottom: 10
  },
  card: {
    flex: 1,
    //backgroundColor: "yellow",
    // borderWidth: 1,
    // borderColor: "black",
    width: width * 0.9
  }
});
