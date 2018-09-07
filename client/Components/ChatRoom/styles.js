import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    alignItems: "center",
    justifyContent: "center"
  },
  catsstate: {
    flex: 1,
    width: width * 0.9,
    alignItems: "center"
  },
  statespace: {
    width: width * 0.96,
    flex: 1
  },
  chatroom: {
    flex: 1,
    width: width,
    margin: 5
  },
  options: {
    flex: 0.7,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center"
  }
}));
