import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import mainRouts from '../routs/mainRouts';
import Home from '../../screens/home/Home';

const Stack = createNativeStackNavigator();


const AuthPassed = () => {
  return (
    <Stack.Navigator>
 
          <Stack.Screen
            name={mainRouts.home}
            component={Home}
            options={{ headerShown: false }}
          />
    </Stack.Navigator>
  );
};

export default AuthPassed;