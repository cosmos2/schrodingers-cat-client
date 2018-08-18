import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import Store from "./store";

export default class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catId: this.props.id
    };
    this.images = {
      1: require("./img/dummyCat_1.png"),
      2: require("./img/dummyCat_2.png"),
      3: require("./img/dummyCat_3.png"),
      4: require("./img/dummyCat_4.png"),
      5: require("./img/dummyCat_5.png"),
      6: require("./img/dummyCat_6.png")
    };
  }

  render() {
    const { sendCatInfom } = this.props;
    const { catId } = this.state;
    return (
      <View>
        <Store.Consumer>
          {store => {
            return (
              <TouchableOpacity
                onPress={() =>
                  sendCatInfom(catId, store.afterFirstTokenConnection)
                }
              >
                <Image source={this.images[catId]} />
              </TouchableOpacity>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}
