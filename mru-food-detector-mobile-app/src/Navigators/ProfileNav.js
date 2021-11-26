import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import {Platform} from 'react-native';
import Profile from '../Screens/Profile/Profile';
import MyAccount from '../Screens/Profile/MyAccount';
import EditPassword from '../Screens/Profile/EditPassword';
import About from '../Screens/About/About';
import {Colors} from '../Theme';

const BackIcon = (navigation, iconColor) => (
  <Icon
    name="chevron-back-circle-outline"
    size={30}
    type="ionicon"
    color={iconColor}
    onPress={() => navigation.pop()}
    containerStyle={{marginHorizontal: 5}}
  />
);

const ProfileNav = ({navigation}) => {
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
    //gestureEnabled: true,
    headerStyle: {
      backgroundColor: Colors.profileGreen,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerBackTitleVisible: true,
    headerTitleStyle: {color: Colors.white, fontSize: 18},
  };

  Platform.OS === 'android' &&
    (options.headerLeft = () => BackIcon(navigation, '#fff'));

  Platform.OS === 'android' &&
    (options_white.headerLeft = () => BackIcon(navigation, '#fff'));

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          ...options_white,
          headerTitle: t('userAccount.myAccount'),
          headerBackTitle: t('profile.title'),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{
          ...options_white,
          headerTitle: t('common.password'),
          headerBackTitle: t('userAccount.myAccount'),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          ...options_white,
          headerTitle: t('userAccount.aboutApp'),
          headerBackTitle: t('profile.title'),
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNav;
