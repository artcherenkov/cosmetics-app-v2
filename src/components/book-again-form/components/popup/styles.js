import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  popupContainer: {
    position: `absolute`,
    width: `100%`,
    height: `100%`,
    backgroundColor: `rgba(0, 0, 0, 0.3)`,
    paddingVertical: 40,
    alignItems: `center`,
    justifyContent: `center`,
  },
  popup: {
    flex: 1,
    width: `90%`,
    borderRadius: 10,
    backgroundColor: `white`,
  },
  popupHeader: {
    fontSize: 18,
    textAlign: `center`,
    marginTop: 10,
    marginBottom: 20,
  },
  popupContent: {
  },
  popupDateControls: {
    flexDirection: `row`,
    justifyContent: `center`,
  },
  popupSubmit: {
    marginBottom: 10,
  },
});
