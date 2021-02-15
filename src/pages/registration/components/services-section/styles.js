import { StyleSheet } from "react-native";

export default StyleSheet.create({
  servicesContainer: {
    margin: 15,
    flex: 1,
  },
  serviceContainer: {
    flexWrap: `wrap`,
    flexDirection: `row`,
    marginBottom: 15,
    alignItems: `center`,
  },
  cost: {
    fontSize: 22,
    marginBottom: 20,
  },
  pickerContainer: {
    flexGrow: 1,
    width: 1,
  },
  costInputContainer: {
    width: 60,
    flexDirection: `row`,
    marginLeft: 10,
  },
});
