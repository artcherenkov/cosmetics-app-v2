import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: `flex-start`,
  },
  month: {
    textAlign: `center`,
    fontSize: 18,
    textTransform: `uppercase`,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  controlsContainer: {
    height: `100%`,
    flexDirection: `row`,
    justifyContent: `center`,
    position: `absolute`,
    top: 0,
  },
});
