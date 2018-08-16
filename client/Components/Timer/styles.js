import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 0.1,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  timer: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: "pink",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold"
  }
}));
