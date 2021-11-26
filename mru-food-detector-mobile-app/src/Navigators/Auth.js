import React from 'react';
import Login from '../Screens/Login/Login';
import Registration from '../Screens/Registration/Registration';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

function AuthStack() {
  const AuthNavigator = createStackNavigator();

  return (
    <AuthNavigator.Navigator headerMode={'none'}>
      <AuthNavigator.Screen
        name="Login"
        options={{
          animationTypeForReplace: 'pop',
        }}
        component={Login}
      />
      <AuthNavigator.Screen name="Registration" component={Registration} />
    </AuthNavigator.Navigator>
  );
}

export default AuthStack;
