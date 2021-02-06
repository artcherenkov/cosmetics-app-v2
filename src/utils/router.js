import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Color } from '../constants/colors';

export const ROUTER_OPTIONS = {
  screenOptions: ({ route }) => ({
    tabBarIcon: getIcon(route),
  }),
  tabBarOptions: {
    activeTintColor: Color.PRIMARY,
    inactiveTintColor: Color.DISABLED,
  },
};

export const getIcon = (route) => (params) => {
  const { size, color } = params;
  let iconName;
  switch (route.name) {
    case `Profile`: {
      iconName = `user`;
      break;
    }
    case `Calendar`: {
      iconName = `calendar`;
      break;
    }
    case `Library`: {
      iconName = `book`;
      break;
    }
  }

  return <AntDesign name={iconName} size={size} color={color}/>;
};
