import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import {Platform} from 'react-native';
import Notifications from '../Screens/Notifications/Notifications';
import {Colors} from '../Theme';
import SingleNotification from '../Screens/Notifications/SingleNotification';

const BackIcon = (navigation, iconColor) => (
  <Icon
    name="chevron-back-circle-outline"
    size={30}
    type="ionicon"
    color={iconColor}
    onPress={() =>
      navigation.navigate('NotificationStack', {
        screen: 'Notifications',
      })
    }
    containerStyle={{marginHorizontal: 5}}
  />
);

const NavigationNav = ({navigation}) => {
  const {t} = useTranslation();

  const Stack = createStackNavigator();
  let options = {
    title: null,
    //gestureEnabled: true,
    headerShown: false,
    headerStyle: {
      backgroundColor: Colors.profileGreen,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
  };

  let options_white = {
    title: null,
   // gestureEnabled: true,
    headerStyle: {
      backgroundColor: Colors.profileGreen,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerBackTitleVisible: true,
    headerTitleStyle: {color: Colors.white, fontSize: 18},
  };

  Platform.OS === 'ios' &&
    (options.headerLeft = () => BackIcon(navigation, '#fff'));

  Platform.OS === 'android' &&
    (options_white.headerLeft = () => BackIcon(navigation, '#fff'));

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationDetails"
        component={SingleNotification}
        options={{
          ...options_white,
          headerTitle:
            Platform.OS === 'android'
              ? t('notifications.singleTabTitle')
              : null,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationNav;
