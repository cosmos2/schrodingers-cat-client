import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import Store from "./store";
import { Icon } from "react-native-elements";

const { width } = Dimensions.get("window");

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.images = {
      1: require("./img/cat1.png"),
      2: require("./img/cat2.png"),
      3: require("./img/cat3.png"),
      4: require("./img/cat4.png"),
      5: require("./img/cat5.png"),
      6: require("./img/cat6.png"),
      7: require("./img/cat7.png")
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "고양이 프로필",
      headerStyle: {
        backgroundColor: "#FFAA0E",
        height: 60
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRightContainerStyle: { marginRight: 20, paddingLeft: 10 },
      headerRight: (
        <Store.Consumer>
          {store => {
            return (
              <Icon
                name="pencil"
                type="font-awesome"
                color="white"
                iconStyle={{ paddingLeft: 10 }}
                onPress={() =>
                  params.navigation.navigate("EditProfileScreen", {
                    socket: store.socket
                  })
                }
              />
            );
          }}
        </Store.Consumer>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ navigation: this.props.navigation });
  }

  render() {
    return (
      <View style={styles.container}>
        <Store.Consumer>
          {store => {
            return (
              <View style={styles.card}>
                <View style={styles.profilecat}>
                  <Image source={this.images[store.myInfo.catImage]} />
                </View>
                <View style={styles.userinfo}>
                  <Text style={styles.subtitle}>
                    ID : {store.myInfo.userId}
                  </Text>
                  <Text style={styles.subtitle}>
                    맞은 횟수 : {store.myInfo._hittenCount}
                  </Text>
                  <Text style={styles.subtitle}>
                    채팅 입장 횟수 : {store.myInfo._enterCount}
                  </Text>
                  <Text style={styles.subtitle}>
                    뮤트된 횟수 : {store.myInfo._muteCount}
                  </Text>
                </View>
              </View>
            );
          }}
        </Store.Consumer>
      </View>
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
    alignItems: "center",
    justifyContent: "center"
  },
  userinfo: {
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
    width: width * 0.9
  }
});
