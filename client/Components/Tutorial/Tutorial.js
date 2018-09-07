import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import Images from "../../assets/img/catindex";
import styles from "../Tutorial/styles";

const { width, height } = Dimensions.get("window");

class Tutorial extends Component {
  state = {
    firstornot: false
  };

  _isFirstTime = async () => {
    const first = await AsyncStorage.getItem("firstTime");
    if (first || this.props.tutorial) {
      this.setState({
        firstornot: true
      });
    }
  };
  _closeTutorial = () => {
    this.setState({ firstornot: false });
    if (this.props.toggleTutorial) {
      this._handleTimeout();
    }
  };
  _handleTimeout = () => {
    setTimeout(() => {
      this.props.toggleTutorial(1);
    }, 1100);
  };

  componentDidMount() {
    this._isFirstTime();
  }
  componentWillUnmount() {
    clearTimeout(this._handleTimeout);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tutorial) {
      return { firstornot: true };
    }
    return null;
  }
  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.firstornot}
          style={styles.modalContent}
          animationIn={"slideInLeft"}
          animationOut={"slideOutRight"}
          animationInTiming={1000}
          animationOutTiming={1000}
        >
          <View style={{ flex: 0.07, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                this._closeTutorial();
              }}
            >
              <Image
                style={{ margin: 15, width: 25, height: 25 }}
                source={require("../../assets/img/cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.title}>Tutorial</Text>
            <Swiper showsButtons={true}>
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut1"]}
                  style={{
                    width: width * 0.6,
                    height: height * 0.6,
                    marginTop: 10
                  }}
                />
              </View>
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut2"]}
                  style={{
                    width: width * 0.6,
                    height: height * 0.6,
                    marginTop: 10
                  }}
                />
              </View>
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut3"]}
                  style={{
                    width: width * 0.6,
                    height: height * 0.6,
                    marginTop: 10
                  }}
                />
              </View>
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut4"]}
                  style={{
                    width: width * 0.6,
                    height: height * 0.6,
                    marginTop: 10
                  }}
                />
              </View>
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut5"]}
                  style={{
                    width: width * 0.6,
                    height: height * 0.6,
                    marginTop: 10
                  }}
                />
              </View>
            </Swiper>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Tutorial;
