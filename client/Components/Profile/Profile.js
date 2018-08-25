import React from "react";
import { Text, View, Image } from "react-native";
import Store from "../store";
import { Icon } from "react-native-elements";
import styles from "./styles";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.images = {
      1: require("../../assets/img/cat1.png"),
      2: require("../../assets/img/cat2.png"),
      3: require("../../assets/img/cat3.png"),
      4: require("../../assets/img/cat4.png"),
      5: require("../../assets/img/cat5.png"),
      6: require("../../assets/img/cat6.png"),
      7: require("../../assets/img/cat7.png")
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
      headerRightContainerStyle: { marginRight: 5 },
      headerRight: (
        <Store.Consumer>
          {store => {
            return (
              <Icon
                name="pencil"
                type="font-awesome"
                color="white"
                iconStyle={{
                  paddingRight: 10,
                  paddingLeft: 20,
                  paddingTop: 10,
                  paddingBottom: 10
                }}
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
                    이름 : {store.myInfo.nickname}
                  </Text>
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
