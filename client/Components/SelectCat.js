import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");

class SelectCat extends Component {
  static navigationOptions = {
    title: "어떤 고양이가 좋냐옹?",
    headerStyle: {
      backgroundColor: "#FFAA0E",
      height: 60
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  render() {
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.chooseCat}>
            <View style={styles.catUpper}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("OpenBoxScreen")}
              >
                <Icon
                  type="ionicon"
                  name="logo-octocat"
                  color="pink"
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  type="ionicon"
                  name="logo-octocat"
                  color="black"
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  type="ionicon"
                  name="logo-octocat"
                  color="red"
                  size={50}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.catLower}>
              <TouchableOpacity>
                <Icon
                  type="ionicon"
                  name="logo-octocat"
                  color="purple"
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  type="ionicon"
                  name="logo-octocat"
                  color="blue"
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  type="ionicon"
                  name="logo-octocat"
                  color="green"
                  size={50}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center"
  },
  container: {
    width: width * 0.9,
    height: height * 0.8
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  chooseCat: {
    flex: 1,
    justifyContent: "center"
  },
  catUpper: {
    flex: 0.3,
    alignContent: "space-around",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  catLower: {
    flex: 0.2,
    justifyContent: "space-around",
    flexDirection: "row"
  }
});

export default SelectCat;
