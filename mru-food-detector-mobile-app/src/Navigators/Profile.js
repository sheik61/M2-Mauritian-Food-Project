/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../Screens/Profile/Profile';
import MyAccount from '../Screens/Profile/MyAccount';
import About from '../Screens/About/About';
import EditPassword from '../Screens/Profile/EditPassword';
import {connect} from 'react-redux';

function ProfileStack() {
  const ProfileNavigator = createStackNavigator();
  return (
    <StackNavigator>
      <ProfileNavigator.Screen name="Profile" component={Profile} />
      <ProfileNavigator.Screen name="MyAccount" component={MyAccount} />
      <ProfileNavigator.Screen name="About" component={About} />
      <ProfileNavigator.Screen name="EditPassword" component={EditPassword} />
    </StackNavigator>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, null)(ProfileStack);
