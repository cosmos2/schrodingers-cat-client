import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    marginTop: 100,
    marginBottom: 50,
    borderRadius: 20,
    borderColor: "black"
  },
  title: {
    fontFamily: "Goyang",
    fontSize: 20
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
}));
