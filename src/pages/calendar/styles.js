import { StyleSheet } from "react-native";
import { Color } from "../../constants/colors";

export default StyleSheet.create({
  agenda: {
    flexGrow: 1,
    backgroundColor: `white`,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  calendarStripContainer: {
    backgroundColor: `white`,
  },
  calendarStrip: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: Color.BACKGROUND_BLUE,
  },
});
