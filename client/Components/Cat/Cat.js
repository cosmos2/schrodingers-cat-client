import React, { Component } from "react";
import { View, TouchableWithoutFeedback, Image, Animated } from "react-native";
import Store from "../store";
import images from "../../assets/img/catindex";

class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catId: this.props.id,
      animatePress: new Animated.Value(1)
    };
  }

  animateIn = () => {
    Animated.spring(this.state.animatePress, {
      toValue: 0.8
    }).start();
  };

  handleSetTimeout = (catId, store) => {
    const { sendCatInfom } = this.props;
    setTimeout(() => {
      sendCatInfom(catId, store);
    }, 500);
  };

  animateOut = async (catId, store) => {
    try {
      await Animated.spring(this.state.animatePress, {
        toValue: 1,
        friction: 3,
        tension: 40
      }).start();
      await this.handleSetTimeout(catId, store);
    } catch (err) {
      console.log(err);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.handleSetTimeout);
  }

  render() {
    const { catId } = this.state;
    return (
      <View>
        <Store.Consumer>
          {store => {
            return (
              <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut(catId, store)}
              >
                <View>
                  <Animated.View
                    style={{
                      transform: [
                        {
                          scale: this.state.animatePress
                        }
                      ],
                      borderWidth: 5,
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      borderColor: "#f4da6c",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={images[catId]}
                      style={{ width: 42, height: 42 }}
                    />
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}

export default Cat;
