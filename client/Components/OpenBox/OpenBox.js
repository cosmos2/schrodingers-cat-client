import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Text
} from "react-native";
import Store from "../store";
import { Icon } from "react-native-elements";
import Tutorial from "../Tutorial/Tutorial";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

class OpenBox extends React.Component {
  state = {
    tutorial: false,
    animatedValue: new Animated.Value(1)
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontFamily: "Goyang", fontSize: 17, color: "white" }}>
            고양이들을 만나러 갈고양?
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#f4da6c",
        height: height * 0.07
      },
      headerLeft: (
        <TouchableOpacity onPress={() => params.toggleTutorial()}>
          <Icon
            name="help-circle"
            type="material-community"
            color="white"
            size={22}
            iconStyle={{
              paddingLeft: 10,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10
            }}
          />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { marginRight: 5 },
      headerRight: (
        <Store.Consumer>
          {store => {
            return (
              <TouchableOpacity
                onPress={() => params.openProfile(store.socket)}
              >
                <Icon
                  name="cat"
                  type="material-community"
                  color="white"
                  size={28}
                  iconStyle={{
                    paddingRight: 10,
                    paddingLeft: 20,
                    paddingTop: 9,
                    paddingBottom: 11
                  }}
                />
              </TouchableOpacity>
            );
          }}
        </Store.Consumer>
      )
    };
  };

  _findRoom = () => {
    this.props.navigation.navigate("LoadingScreen");
  };
  _openProfile = async socket => {
    try {
      await socket.emit("info");
      await this.props.navigation.navigate("ProfileScreen");
    } catch (err) {
      console.log(err);
    }
  };
  _toggleTutorial = e => {
    if (e) {
      this.setState({ tutorial: false });
    } else {
      this.setState({ tutorial: true });
    }
  };
  _handlePressIn = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 0.8
    }).start();
  };
  _handlePressOut = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 60
    }).start();
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openProfile: this._openProfile
    });
    this.props.navigation.setParams({
      toggleTutorial: this._toggleTutorial
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.tutorial ? (
          <Tutorial
            tutorial={this.state.tutorial}
            toggleTutorial={this._toggleTutorial}
          />
        ) : null}
        <Text style={styles.text}>상자속에 고양이들이 있을 것 같다옹</Text>
        <TouchableWithoutFeedback
          onPressIn={this._handlePressIn}
          onPressOut={() => {
            this._handlePressOut();
            setTimeout(() => {
              this._findRoom();
            }, 500);
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: this.state.animatedValue
                }
              ]
            }}
          >
            <Image
              style={{ width: 250, height: 250 }}
              source={require("../../assets/img/openBox.gif")}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default OpenBox;
