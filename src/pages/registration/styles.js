import { StyleSheet } from 'react-native';

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
  cost: {
    fontSize: 22,
    marginBottom: 20,
  },
  controls: {
    flexDirection: `row`,
    width: `100%`,
    justifyContent: `space-around`,
    zIndex: -1,
    marginBottom: 30,
  },
  dateContainer: {
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
    backgroundColor: `white`,
    borderRadius: 5,
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderColor: `#808080`,
  },
  durationControl: {
    width: 68,
    backgroundColor: `rgb(228, 228, 228)`,
    borderWidth: 0,
  },
  date: {
    fontSize: 16,
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
});
