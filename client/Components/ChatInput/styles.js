import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: width * 0.85,
    height: height * 0.05,
    marginLeft: 2
  },
  chatinput: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 30,
    height: 38
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "500",
    fontWeight: "bold"
  }
}));
