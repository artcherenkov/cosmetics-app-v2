import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `white`,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  card: {
    flex: 1,
    flexGrow: 1,
    alignSelf: `stretch`,
    marginHorizontal: 20,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: `row`,
    borderColor: `red`,
    alignItems: `center`,
    flexGrow: 1,
  },
  avatarWrapper: {
    height: 100,
    width: 100,
    backgroundColor: `rgb(242, 242, 242)`,
    borderRadius: 100 / 2,
  },
  avatar: {
    width: `100%`,
    height: `100%`,
    borderRadius: 100 / 2,
  },
  headerContent: {
    flex: 1,
    flexGrow: 2,
    flexDirection: `column`,
    justifyContent: `space-between`,
  },
  nameWrapper: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    flexGrow: 1,
  },
  name: {
    fontSize: 26,
    marginBottom: 5,
  },
  login: {
    fontSize: 14,
    color: `#434343`,
  },
  ratingWrapper: {
    flex: 1,
    flexGrow: 2,
    flexDirection: `row`,
  },
  rateItem: {
    flexGrow: 1,
    flex: 1,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  rating: {
    fontSize: 28,
  },
  place: {
    fontSize: 28,
  },
  bodyWrapper: {
    flex: 1,
    flexGrow: 3,
    marginTop: 30,
    borderColor: `green`,
  },
  userInfoTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: `#434343`,
  },
  userInfo: {
    marginBottom: 20,
    fontSize: 20,
  },
  role: {
    marginBottom: 20,
    fontSize: 16,
  },
});
