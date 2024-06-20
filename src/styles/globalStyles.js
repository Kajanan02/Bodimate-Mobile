import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../utils/Enum";

const globalStyles =StyleSheet.create({
  textInputContainer: {
    height: 44,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 4,
    borderWidth: 0.75,
    borderColor: "#3F44511F",
    backgroundColor: "white",
    flexDirection: "row",
  },
  textLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    alignSelf: "flex-start",
    color:"#000",
    margin: 5,
    marginTop: -6,
  },
  textInputStyle: {
    flex: 1,
    justifyContent: "center",
    color: "#000",
    paddingLeft: 8,
  },
  primaryButton: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#024950",
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    borderRadius: 4,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 30,
  },
  errorMsg: {
    color: "#FF7A7A",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Poppins-Regular",
    alignSelf: "flex-start",
    marginTop: 5,
    marginLeft: 16,
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  }
})

export default globalStyles;
