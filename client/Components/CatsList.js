import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import Images from "./img/catindex";
import Store from "./store";

const { width, height } = Dimensions.get("window");

export default class CatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatroomcats: [
        { userId: 123, catId: 1, hp: 7 },
        { userId: 87, catId: 2, hp: 7, socketId: "" },
        { userId: 10, catId: 4, hp: 7, socketId: "" },
        { userId: 11, catId: 3, hp: 7, socketId: "" }
      ],
      attackmode: false,
      healingmode: false,
      myattacknum: 5
    };
  }
  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <View style={styles.container}>
              <View style={styles.state}>
                {this.state.chatroomcats.map((item, i) => {
                  return (
                    <View
                      key={i}
                      style={
                        this.props.myuserid === item.userId
                          ? styles.mycat
                          : styles.eachcat
                      }
                    >
                      <TouchableOpacity
                        disabled={
                          this.props.myuserid === item.userId ||
                          this.state.myattacknum <= 0
                            ? // && (this.props.myuserid === item.userId && item.hp <= 0)
                              true
                            : this.state.attackmode || this.state.healingmode
                              ? false
                              : true
                        }
                        onPress={
                          this.state.attackmode && !this.state.healingmode
                            ? () => {
                                console.log(item.userId);
                                this.setState({
                                  myattacknum: this.state.myattacknum - 1
                                });
                              }
                            : !this.state.attackmode && this.state.healingmode
                              ? () => {
                                  console.log(item.userId);
                                }
                              : null
                        }
                      >
                        <Image
                          source={Images[item.catId]}
                          style={{
                            marginTop: 8,
                            marginLeft: 10,
                            width: 50,
                            height: 50
                          }}
                        />
                      </TouchableOpacity>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.subtitle}>ID : {item.userId}</Text>
                        <Text style={styles.subtitle}>HP : {item.hp} / 7</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={styles.attackspace}>
                {this.state.myattacknum > 0 ? (
                  this.state.attackmode ? (
                    <View style={styles.attack}>
                      <TouchableOpacity
                        disabled={this.state.attackmode ? false : true}
                        onPress={() => {
                          this.setState({ attackmode: false });
                          console.log("공격 모드");
                        }}
                      >
                        <Image
                          source={require("./img/pawprint5.png")}
                          style={{
                            marginBottom: 1
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={styles.subtitle}>
                        공 격 중 ( {this.state.myattacknum} / 5 )
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.attack}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            attackmode: true,
                            healingmode: false
                          });
                          console.log("공격 모드 해제");
                        }}
                      >
                        <Image
                          source={require("./img/pawprint4.png")}
                          style={{
                            marginBottom: 1
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={styles.subtitle}>
                        공 격 력 ( {this.state.myattacknum} / 5 )
                      </Text>
                    </View>
                  )
                ) : (
                  <View style={styles.attack}>
                    <Image
                      source={require("./img/catcup.png")}
                      style={{
                        marginBottom: 1
                      }}
                    />
                    <Text style={styles.subtitle}>공 격 력 0</Text>
                  </View>
                )}
                {/* ----------------------------- Healing Button ---------------------------------------- */}
              </View>
            </View>
          );
        }}
      </Store.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  },
  state: {
    flex: 0.65,
    width: width * 0.96,
    flexDirection: "row",
    //backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 10,
    flexWrap: "wrap"
  },
  attackspace: {
    flex: 0.4,
    //backgroundColor: "skyblue",
    width: width,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  eachcat: {
    width: "50%",
    height: "50%",
    borderColor: "black",
    borderWidth: 0.5,
    flexDirection: "row"
  },
  subtitle: {
    color: "black",
    fontSize: 15,
    marginTop: 7,
    marginLeft: 10,
    fontWeight: "500",
    fontWeight: "bold",
    fontFamily: "Goyang"
    //marginBottom: 10
  },
  attack: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    //backgroundColor: "red",
    flex: 1
  },
  mycat: {
    width: "50%",
    height: "50%",
    borderColor: "black",
    borderWidth: 0.5,
    flexDirection: "row",
    backgroundColor: "pink"
  }
});
