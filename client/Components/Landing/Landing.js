import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import styles from "./styles";

class Landing extends Component {
  static navigationOptions = {
    header: null
  };
  _userInfo = async () => {
    // 첫 접속인지 아닌지 확인 후 뷰를 넘김
    try {
      const firstTime = await AsyncStorage.getItem("firstTime");
      if (firstTime === "firstTime") {
        this.props.navigation.navigate("SelectCatScreen");
      } else {
        this.props.navigation.navigate("OpenBoxScreen");
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this._userInfo();
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>슈뢰딩거의 고양이</Text>
      </View>
    );
  }
}

export default Landing;
