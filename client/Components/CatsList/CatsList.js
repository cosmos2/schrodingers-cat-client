import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Vibration
} from "react-native";
import Images from "../../assets/img/catindex";
import Store from "../store";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import styles from "./styles";

class CatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muteornot: false,
      attackmode: false,
      healingmode: false,
      myattacknum: 5,
      animatePress: new Animated.Value(1),
      showText: true
    };
  }
  animateIn = () => {
    Animated.spring(this.state.animatePress, {
      toValue: 0.8
    }).start();
  };

  animateOut = () => {
    Animated.spring(this.state.animatePress, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
  };

  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <View style={styles.container}>
              {!this.state.attackmode ? (
                <View style={{ flex: 0.1 }} />
              ) : this.state.myattacknum === 0 ? (
                <View style={{ flex: 0.1 }}>
                  <Text style={{ fontFamily: "Goyang", fontSize: 15 }}>
                    펀치할 힘이 없다옹..
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 0.1 }}>
                  <Text style={{ fontFamily: "Goyang", fontSize: 15 }}>
                    고양이 얼굴을 펀치하라옹!!
                  </Text>
                </View>
              )}
              <View style={styles.state}>
                {store.roomusers.map((item, i) => {
                  return (
                    <View key={i} style={styles.eachcat}>
                      <TouchableWithoutFeedback
                        onPressIn={() => this.animateIn()}
                        onPressOut={() => this.animateOut()}
                        disabled={
                          item.hp === 0
                            ? true
                            : !!(
                                this.props.myuserid === item.userId ||
                                this.state.myattacknum <= 0
                              )
                              ? true
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
                                store.socket.emit("hit", item.socketId);
                                this.setState({
                                  myattacknum: this.state.myattacknum - 1,
                                  changeImage: item.userId
                                });
                                setTimeout(() => {
                                  this.setState({
                                    changeImage: ""
                                  });
                                }, 500);
                              }
                            : !!(
                                !this.state.attackmode && this.state.healingmode
                              )
                              ? () => {}
                              : null
                        }
                      >
                        <View>
                          <Animated.View
                            style={[
                              {
                                transform: [
                                  {
                                    scale: this.state.animatePress
                                  }
                                ]
                              },
                              this.props.myuserid === item.userId
                                ? styles.mycatBorder
                                : styles.catBorder
                            ]}
                          >
                            <Image
                              source={
                                this.state.changeImage === item.userId
                                  ? Images["punch"]
                                  : item.hp === 0
                                    ? Images["mute"]
                                    : Images[item.catImage]
                              }
                              style={styles.catImage}
                            />
                          </Animated.View>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.nickname}>{item.nickname}</Text>
                        <View style={{ flexDirection: "row", marginTop: 3 }}>
                          <Text style={styles.subtitle}>HP : </Text>
                          <Image
                            source={Images["b" + (8 - item.hp)]}
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
                      <View style={styles.attackBtn}>
                        <AwesomeButtonRick
                          type="secondary"
                          backgroundDarker="#DA472F"
                          backgroundColor="#ef6f6f"
                          backgroundActive="#DA472F"
                          borderColor="#ef6f6f"
                          height={40}
                          onPress={() => {
                            this.setState({ attackmode: false });
                          }}
                        >
                          <Text style={styles.punchtext}>
                            뚜 쉬 뚜 쉬 펀 치 중 ( {this.state.myattacknum} / 5
                            )
                          </Text>
                        </AwesomeButtonRick>
                      </View>
                    ) : (
                      <View style={styles.attackBtn}>
                        <AwesomeButtonRick
                          type="secondary"
                          backgroundDarker="#FFB511"
                          backgroundColor="#f4da6c"
                          backgroundActive="#FFB511"
                          borderColor="#f4da6c"
                          textColor="#ef6f6f"
                          height={40}
                          onPress={() => {
                            this.setState({
                              attackmode: true,
                              healingmode: false
                            });
                          }}
                        >
                          <Text style={styles.attacktext}>
                            냥 냥 펀 치 (click) ( {this.state.myattacknum} / 5 )
                          </Text>
                        </AwesomeButtonRick>
                      </View>
                    )
                  ) : (
                    <View style={styles.attackBtn}>
                      <AwesomeButtonRick
                        type="secondary"
                        disabled={true}
                        backgroundDarker="#968F8B"
                        backgroundColor="#e5dfdf"
                        borderColor="#e5dfdf"
                        height={40}
                      >
                        <Text style={styles.noenergytext}>공 격 력 0</Text>
                      </AwesomeButtonRick>
                    </View>
                  )
                ) : (
                  <View style={styles.attack}>
                    <Text>조용히 있으라옹</Text>
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

export default CatsList;
