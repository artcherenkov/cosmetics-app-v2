import { StyleSheet } from 'react-native';
import { Color } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: `white`,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 24,
    margin: 20,
    textAlign: `center`,
  },
  info: {
    marginBottom: 10,
    color: `grey`,
    fontSize: 18,
  },
  serviceCost: {
    minWidth: 40,
  },
  infoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: `#808080`,
    paddingBottom: 15,
    marginBottom: 15,
  },
  costContainer: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  controls: {
    // flexDirection: `row`,
    width: `100%`,
    // justifyContent: `space-around`,
    zIndex: -1,
    marginBottom: 50,
  },
  dateView: {
    width: 148,
  },
  intervalView: {
    alignItems: `center`,
  },
  dateControlsContainer: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    flexWrap: `wrap`,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: `#d6d6d6`,
  },
  intervalContainer: {
    flexDirection: `row`,
    justifyContent: `center`,
  },
  dateControl: {
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: `rgb(228, 228, 228)`,
    borderRadius: 5,
    height: 35,
    padding: 5,
  },
  dateControlLeft: {
    marginRight: 8,
  },
  durationControl: {
    width: 68,
    backgroundColor: `rgb(228, 228, 228)`,
    borderWidth: 0,
  },
  date: {
    fontSize: 17,
    textAlign: `center`,
    width: `100%`,
  },
  dateIcon: {
    marginLeft: 10,
  },
  durationContainer: {
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 5,
    backgroundColor: `rgb(228, 228, 228)`,
    marginTop: 10,
    padding: 5,
    width: 75,
  },
  durationText: {
    fontSize: 16,
  },
  bookAgainContainer: {
    width: `100%`,
    marginHorizontal: `auto`,
    flexDirection: `row`,
    justifyContent: `center`,
  },
  bookAgainBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: Color.PRIMARY,
  },
  bookAgainTitle: {
    fontSize: 18,
    textAlign: `center`,
    color: `white`,
    fontWeight: `bold`,
  },
});
