import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    alignItems: "center",
    justifyContent: "center"
  },
  statetext: {
    color: "black",
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  mychat: {
    alignItems: "flex-end"
  },
  chatfont: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  eachmychat: {
    borderRadius: 10,
    margin: 5,
    padding: 8,
    justifyContent: "flex-end",
    backgroundColor: "#F4E39D",
    flexDirection: "row"
  },
  eachotherschat: {
    margin: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#C4E1DE",
    flexDirection: "row"
  },
  chats: {
    flex: 1,
    marginBottom: 5,
    width: width
  },
  chatinput: {
    flex: 0.15,
    flexDirection: "row"
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "500",
    fontWeight: "bold"
  }
}));
