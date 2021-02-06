import { StyleSheet } from 'react-native';
import { Color } from '../../../../constants/colors';

export default StyleSheet.create({
  dayContainer: {
    padding: 5,
  },
  content: {
    width: `100%`,
    height: `100%`,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: 10,
  },
  contentIsActive: {
    borderWidth: 2,
    borderColor: Color.ORANGE,
  },
  contentIsToday: {
    borderWidth: 2,
    borderColor: Color.PRIMARY,
    backgroundColor: Color.PRIMARY_10_RGB,
  },
  day: {
    fontWeight: `700`,
  },
  dayOfWeek: {
    color: Color.DISABLED,
  },
});
