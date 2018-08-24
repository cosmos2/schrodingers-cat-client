import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    alignItems: "center",
    justifyContent: "center"
  },
  profilecat: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  userinfo: {
    alignItems: "center",
    justifyContent: "center"
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 20,
    fontFamily: "Goyang",
    fontWeight: "500",
    fontWeight: "bold"
  },
  title: {
    color: "black",
    fontSize: 50,
    marginTop: 10,
    fontWeight: "700",
    marginBottom: 10
  },
  card: {
    flex: 1,
    width: width * 0.9
  }
}));
