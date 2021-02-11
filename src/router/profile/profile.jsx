import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../../pages/profile/profile';
import RatingScreen from '../../pages/rating/rating';

const Stack = createStackNavigator();

const ProfileRouter = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: `Профиль`, headerShown: false }} />
    <Stack.Screen name="Rating" component={RatingScreen} />
  </Stack.Navigator>
);

export default ProfileRouter;
