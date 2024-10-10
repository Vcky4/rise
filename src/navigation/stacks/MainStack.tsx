import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import mainRouts from '../routs/mainRouts';
import Home from '../../screens/home/Home';
import SetPin from '../../screens/auth/SetPin';
import Success from '../../screens/home/Success';

const Stack = createNativeStackNavigator();


const AuthPassed = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={mainRouts.setPin} component={SetPin} options={{ headerShown: false }} />
      <Stack.Screen
        name={mainRouts.home}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={mainRouts.success}
        component={Success}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthPassed;