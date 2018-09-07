import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  state: {
    flex: 1,
    width: width * 0.99,
    flexDirection: "row",
    borderRadius: 10,
    flexWrap: "wrap"
  },
  attackspace: {
    flex: 0.25,
    width: width
  },
  eachcat: {
    width: "50%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center"
  },
  attacktext: {
    color: "#ef6f6f",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  punchtext: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  noenergytext: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Goyang"
  },
  subtitle: {
    color: "black",
    fontSize: 13,
    marginTop: 5,
    marginLeft: 1,
    fontWeight: "500",
    fontWeight: "bold",
    fontFamily: "Goyang"
  },
  catImage: {
    width: 50,
    height: 50,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3
  },
  catBorder: {
    borderColor: "#6dd3fe",
    borderRadius: 40,
    borderWidth: 5,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  mycatBorder: {
    borderColor: "#f4da6c",
    borderRadius: 40,
    borderWidth: 5,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  nickname: {
    color: "black",
    fontSize: 13,
    marginTop: 5,
    marginLeft: 2,
    fontWeight: "500",
    fontWeight: "bold"
  },
  attack: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#f4da6c",
    borderColor: "#f4da6c",
    borderRadius: 40,
    borderWidth: 3,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10
  },
  attackBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 5
  }
}));
