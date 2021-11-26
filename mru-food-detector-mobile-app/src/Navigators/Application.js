import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getUser} from '../Redux/actions/user';
import {Text, View, StatusBar} from 'react-native';
import AuthStack from './Auth';
import {Icon} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {Layout, LightMode, Fonts, Gutters, Colors} from '../Theme';
import {NavigationContainer} from '@react-navigation/native';
import CheckConnection from '../Utils/CheckConnection';

const ErrorCard = () => {
  const {t} = useTranslation();

  return (
    <View
      style={[
        Layout.alignItemsCenter,
        Gutters.tinyVPadding,
        Layout.row,
        Layout.justifyContentCenter,
        {backgroundColor: Colors.red},
      ]}>
      <Icon
        name="cloud-offline-outline"
        size={20}
        type="ionicon"
        color={'#fff'}
      />
      <Text
        style={[
          Fonts.textRegular,
          Gutters.regularLMargin,
          {color: Colors.white},
        ]}>
        {t('errors.connectionError')}
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();
function ApplicationNavigator({user}) {
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    let authKey = await AsyncStorage.getItem('authKey');
    getUser(authKey);
  };

  let network = CheckConnection();

  return (
    <NavigationContainer theme={LightMode}>
      <StatusBar />
      {!network && <ErrorCard />}
      <View style={[Layout.fill]}>
        <Stack.Navigator headerMode={'none'}>
          {user?.authKey === null || user?.isRegistration ? (
            <Stack.Screen
              name="AuthStack"
              options={{
                animationTypeForReplace: 'pop',
              }}
              component={AuthStack}
            />
          ) : (
            <Stack.Screen
              name="Main"
              component={
                (MainNavigator = require('../Navigators/Main').default)
              }
            />
          )}
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: authKey => dispatch(getUser(authKey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationNavigator);
