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
                <Image source={require("./img/catDemo.png")} />
              </TouchableOpacity>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}
