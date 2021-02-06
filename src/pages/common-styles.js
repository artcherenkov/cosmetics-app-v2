import {StyleSheet} from "react-native";
import { Color } from "../constants/colors";

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_BLUE,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: `row`,
    paddingHorizontal: 10,
    alignItems: `center`,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
});
