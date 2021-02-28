import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 2,
    zIndex: 10,
  },
  list: {
    height: 350,
    paddingTop: 5,
  },
  listItem: {
    padding: 5,
    flexDirection: `row`,
  },
  searchWrapper: {
    padding: 5,
  },
  searchInput: {
    paddingVertical: 5,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderColor: `#cbcbcb`,
  },
  pickedValueContainer: {
    padding: 10,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: `#909090`,
    borderRadius: 5,
  },
  pickedValueContainerActive: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  pickedValue: {
    flexGrow: 1,
    maxWidth: `95%`,
  },
  icon: {
    marginHorizontal: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: `#909090`,
    borderTopWidth: 0,
  },
});
