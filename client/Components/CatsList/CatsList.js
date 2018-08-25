import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Vibration
} from "react-native";
import Images from "../../assets/img/catindex";
import Store from "../store";

const { width } = Dimensions.get("window");

export default class CatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muteornot: false,
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
                {store.roomusers.map((item, i) => {
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
                          item.hp === 0
                            ? true
                            : !!(
                                this.props.myuserid === item.userId ||
                                this.state.myattacknum <= 0
                              )
                              ? // && (this.props.myuserid === item.userId && item.hp <= 0)
                                true
                              : !!(
                                  this.state.attackmode ||
                                  this.state.healingmode
                                )
                                ? false
                                : true
                        }
                        onPress={
                          !!(this.state.attackmode && !this.state.healingmode)
                            ? () => {
                                Vibration.vibrate(100);
                                console.log(item.userId);
                                store.socket.emit("hit", item.socketId);
                                this.setState({
                                  myattacknum: this.state.myattacknum - 1,
                                  changeImage: item.userId
                                });
                                setTimeout(() => {
                                  this.setState({
                                    changeImage: ""
                                  });
                                }, 200);
                              }
                            : !!(
                                !this.state.attackmode && this.state.healingmode
                              )
                              ? () => {
                                  console.log(item.userId);
                                }
                              : null
                        }
                      >
                        <Image
                          source={
                            this.state.changeImage === item.userId
                              ? Images["punch"]
                              : item.hp === 0
                                ? Images[7]
                                : Images[item.catImage]
                          }
                          style={{
                            marginTop: 6,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            shadowColor: "black",
                            shadowOffset: { height: 2 },
                            shadowOpacity: 0.3
                          }}
                        />
                      </TouchableOpacity>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.nickname}>{item.nickname}</Text>
                        {/* <Text style={styles.subtitle}>ID : {item.userId}</Text> */}
                        <View style={{ flexDirection: "row", marginTop: 3 }}>
                          <Text style={styles.subtitle}>HP : </Text>
                          <Image
                            source={
                              item.hp > 6
                                ? Images["b1"]
                                : item.hp > 5
                                  ? Images["b2"]
                                  : item.hp > 3
                                    ? Images["b3"]
                                    : item.hp > 1
                                      ? Images["b4"]
                                      : Images["b5"]
                            }
                            style={{
                              //marginTop: 10,
                              width: 50,
                              height: 30
                            }}
                          />
                          <Text style={styles.subtitle}>{item.hp} / 7</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={styles.attackspace}>
                {!store.muteornot ? (
                  this.state.myattacknum > 0 ? (
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
                            source={require("../../assets/img/pawprint5.png")}
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
                            source={require("../../assets/img/pawprint4.png")}
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
                        source={require("../../assets/img/catcup.png")}
                        style={{
                          marginBottom: 1
                        }}
                      />
                      <Text style={styles.subtitle}>공 격 력 0</Text>
                    </View>
                  )
                ) : (
                  <View style={styles.attack}>
                    <Text>뮤트 시 공격 불가</Text>
                  </View>
                )}
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
    alignItems: "center",
    justifyContent: "center"
  },
  state: {
    flex: 0.65,
    width: width * 0.96,
    flexDirection: "row",
    borderRadius: 10,
    flexWrap: "wrap"
  },
  attackspace: {
    flex: 0.3,
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
    fontSize: 13,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "500",
    fontWeight: "bold",
    fontFamily: "Goyang"
  },
  nickname: {
    color: "black",
    fontSize: 13,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "500",
    fontWeight: "bold"
    //fontFamily: "Goyang"
  },
  attack: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
