import { StyleSheet } from 'react-native';
import { Color } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    height: `100%`,
    alignItems: `center`,
  },
  logoContainer: {
    flexDirection: `row`,
    width: `70%`,
    height: `25%`,
    justifyContent: `center`,
    marginTop: 30,
  },
  logo: {
    flex: 1,
    resizeMode: `cover`,
    justifyContent: `center`,
  },
  formContainer: {
    flexGrow: 1,
    marginBottom: 70,
    width: `100%`,
  },
  formContainerContent: {
    alignItems: `center`,
  },
  inputContainer: {
    margin: 10,
    width: `100%`,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: `#ababab`,
    borderRadius: 5,
    height: 40,
    fontSize: 18,
    marginVertical: 5,
    padding: 5,
  },
  invalidInput: {
    borderColor: `red`,
  },
  errorMessage: {
    color: `red`,
  },
  controlsContainer: {
    alignItems: `center`,
    width: `100%`,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  submitBtn: {
    width: `100%`,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Color.PRIMARY,
    borderRadius: 10,
  },
  submitText: {
    fontSize: 20,
    color: `white`,
    textAlign: `center`,
  },
  changeModeBtn: {
    marginTop: 15,
  },
  changeModeText: {
    color: Color.PRIMARY,
  },
});
