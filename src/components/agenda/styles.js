import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  agendaContainer: {
    height: 200,
  },
  hourContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    paddingLeft: 50,
    paddingTop: 15,
  },
  hourSection: {
    borderTopWidth: 1,
    borderColor: `lightgrey`,
    flexGrow: 1,
    height: 45,
  },
  hour: {
    position: `absolute`,
    left: 10,
    elevation: 1,
    top: 6,
    fontSize: 12,
    paddingRight: 10,
  },
});
