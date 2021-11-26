/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddSpot from '../Screens/AddSpot/AddSpot';
import { Colors, Layout } from '../Theme';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../Redux/actions/user';
import ProfileNav from './ProfileNav';
import { Icon } from 'react-native-elements';
import MyFood from '../Screens/MyFood/'
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <View style={[Layout.fill]}>
      <Tab.Navigator
        initialRouteName="AddSpot"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let type;
            if (route.name === 'AddSpot') {
              iconName = 'camera';
              type = 1;
            }
            else if (route.name === 'MyFood') {
              iconName = 'fast-food-outline';
              type = 1;
            }
            else {
              iconName = 'person-circle';
              type = 1;
            }

            return (
              <Icon
                type="ionicon"
                size={size}
                color={color}
                name={iconName}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.icons,
          inactiveTintColor: '#333',
          showLabel: false
        }}>
        <Tab.Screen
          name="AddSpot"
          component={AddSpot}
          unmountOnBlur={true}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="MyFood"
          component={MyFood}
          unmountOnBlur={true}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name="ProfileStack" component={ProfileNav} />
      </Tab.Navigator>
    </View>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: (authKey, token) => dispatch(logout(authKey, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
