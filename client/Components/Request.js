import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { Akira } from "react-native-textinput-effects";
// import { Sae } from "react-native-textinput-effects";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default class Request extends Component {
  state = {
    request: this.props.request,
    value: "report",
    email: "",
    msg: "",
    myUserId: 0,
    nickname: ""
  };

  radio_props = [
    { label: "신고하기   ", value: "report" },
    { label: "기타 요청", value: "request" }
  ];

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.request) {
      return { request: true };
    }
    return null;
  }

  async componentDidMount() {
    const myUserId = await AsyncStorage.getItem("myUserId");
    console.log(JSON.parse(myUserId), "===========");
    if (myUserId !== null) {
      this.setState({
        myUserId: JSON.parse(myUserId).userId,
        nickname: JSON.parse(myUserId).nickname
      });
    }
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.request}
          style={styles.modalContent}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          <View style={{ flex: 0.07, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                this._closeTutorial();
              }}
            >
              <Image
                style={{ margin: 15, width: 25, height: 25 }}
                source={require("../assets/img/cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.title}>집사에게 쪽지보내기</Text>
            <View style={{ marginTop: 20 }}>
              <RadioForm
                radio_props={this.radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={"#f4da6c"}
                selectedButtonColor={"#f4da6c"}
                animation={true}
                onPress={value => {
                  this.setState({ value: value });
                }}
              />
            </View>
            <View style={{ width: width * 0.8, marginTop: 10 }}>
              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  fontSize: 20,
                  fontFamily: "Goyang"
                }}
              >
                이 메 일 주 소
              </Text>
              <TextInput
                placeholder="  답장 받으실 이메일 주소를 입력해 주세요. "
                style={{
                  height: 30,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 20,
                  fontFamily: "Goyang"
                }}
                onChangeText={email => {
                  this.setState({
                    email: email
                  });
                }}
                autoCapitalize={"none"}
                autoCorrect={false}
              />
              <View>
                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    fontSize: 20,
                    fontFamily: "Goyang"
                  }}
                >
                  요 청 사 항
                </Text>
                <TextInput
                  multiline={true}
                  placeholder="  불편을 드려 죄송합니다. "
                  numberOfLines={5}
                  style={{
                    height: 60,
                    borderWidth: 1,
                    borderRadius: 10,
                    fontSize: 20,
                    fontFamily: "Goyang"
                  }}
                  onChangeText={req => {
                    this.setState({
                      msg: req
                    });
                  }}
                  blurOnSubmit={true}
                />
              </View>
              <View
                style={{
                  marginTop: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <AwesomeButtonRick
                  type="secondary"
                  backgroundDarker="#FFB511"
                  backgroundColor="#f4da6c"
                  backgroundActive="#FFB511"
                  borderColor="#f4da6c"
                  height={40}
                  onPress={this._sendMessage}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Goyang",
                      fontSize: 20
                    }}
                  >
                    보 내 기
                  </Text>
                </AwesomeButtonRick>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _sendMessage = () => {
    if (this.state.email.length < 5) {
      Alert.alert("이메일 주소를 입력해주세요");
      return;
    }
    axios
      .post("https://catadmin.gq/admin/message", {
        userId: Number(this.state.myUserId),
        userNick: this.state.nickname,
        email: this.state.email,
        content: this.state.msg,
        category: this.state.value
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    Alert.alert(
      "쪽지주셔서 감사합니다!",
      "빠르게 조치를 취하도록 하겠습니다.",
      [
        {
          text: "확인",
          onPress: () => {
            this._closeTutorial();
          }
        }
      ],
      { cancelable: false }
    );
  };

  _getMessage = () => {
    const arr = axios.get("https://catadmin.gq/admin/message");
    console.log(arr);
  };

  _closeTutorial = () => {
    this.setState({ request: false });
  };
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    //justifyContent: "center",
    marginTop: 100,
    marginBottom: 50,
    //alignItems: "center",
    borderRadius: 20,
    borderColor: "black"
    // width: width * 0.7,
    // height: height * 0.7
  },
  title: {
    fontFamily: "Goyang",
    fontSize: 30
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
