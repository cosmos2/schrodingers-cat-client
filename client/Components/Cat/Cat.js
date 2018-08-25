import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Store from "../store";

export default class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catId: this.props.id
    };
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

  render() {
    const { sendCatInfom } = this.props;
    const { catId } = this.state;
    return (
      <View>
        <Store.Consumer>
          {store => {
            return (
              <TouchableOpacity onPress={() => sendCatInfom(catId, store)}>
                <Image source={this.images[catId]} />
              </TouchableOpacity>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}
