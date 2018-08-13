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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Choose your cat</Text>
        </View>
        <View style={styles.chooseCat}>
          <View style={styles.catUpper}>
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
                color="black"
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
          </View>
          <View style={styles.catLower}>
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
                color="black"
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
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.8,
    borderColor: "black",
    borderWidth: 2
  },
  title: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  chooseCat: {
    flex: 1
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
