/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {Common, Fonts, Gutters, Layout} from '../../Theme';
import {withTranslation} from 'react-i18next';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {validateEmail} from '../../Utils/Utils';
import {connect} from 'react-redux';
import {
  authenticateUser,
  setFireBaseToken,
  forgetPassword,
  loginAsGuest,
  resetUser,
} from '../../Redux/actions/user';
import Snackbar from 'react-native-snackbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordVisible: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  async componentDidMount() {
    let registrationRedirection = await AsyncStorage.getItem('Registration');

    if (registrationRedirection === '1') {
      AsyncStorage.removeItem('Registration');
      this.goToRegistration();
    }
  }

  toggleSecureText = () => {
    this.setState({passwordVisible: !this.state.passwordVisible});
  };

  onChangeEmail = email => {
    let emailError = validateEmail(email)
      ? null
      : this.props.t('errors.emailError');
    this.setState({email, emailError});
    this.validateForm();
  };

  onChangePassword = password => {
    let passwordError =
      password === '' ? this.props.t('errors.passwordError') : null;
    this.setState({password, passwordError});
    this.validateForm();
  };

  goToRegistration = () => {
    const {navigation} = this.props;
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Registration',
      }),
    );
  };

  loginUser = () => {
    Keyboard.dismiss();

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.props
          .authenticateUser(this.state.email, this.state.password)
          .then(() => {
            if (this.props.user?.error) {
              Snackbar.show({
                backgroundColor: 'red',
                text: this.props.user?.error,
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          });
      }
    });
  };

  goToHome = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Main'}],
      }),
    );
  };
  validateForm = () => {
    return this.state.password === '' || !validateEmail(this.state.email);
  };

  resetPassword = () => {
    if (this.state.email.trim() === '' || !validateEmail(this.state.email)) {
      Snackbar.show({
        backgroundColor: 'red',
        text: this.props.t('errors.emailError'),
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    this.props.forgetPassword(this.state.email).then(() => {
      if (this.props.user.error) {
        Snackbar.show({
          backgroundColor: 'red',
          text: this.props.user.error,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        Snackbar.show({
          backgroundColor: 'green',
          text: this.props.t('alert.checkMailForNewPassword'),
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    });
    return;
  };
  render() {
    const {t} = this.props;
    const image = require('../../Assets/Images/mru-flag.png');

    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground source={image} style={Common.image} blurRadius={30}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{...Layout.fullHeight}}
            style={[
              Layout.fullHeight,
              Gutters.largeVPadding,
              Gutters.regularHPadding,
            ]}>
            <View style={[Gutters.smallHPadding]}>
              <Text
                style={[
                  Fonts.titleLarge,
                  Fonts.textLeft,
                  Fonts.textColor,
                  Gutters.largeTPadding,
                ]}>
                {t('login.title')}
              </Text>
              <Text
                style={[
                  Fonts.textColor,
                  Fonts.titleRegular,
                  Gutters.largeTPadding,
                ]}>
                {t('login.subTitle')}
              </Text>
              {/* <Text
                style={[
                  Fonts.textColor,
                  Gutters.largeTPadding,
                ]}>
                {t('login.text')}
              </Text> */}
            </View>
            <View
              style={[
                Layout.fill,
                Gutters.largeVPadding,
                Layout.justifyContentAround,
              ]}>
              <View
                style={[
                  Gutters.smallHPadding,
                  Gutters.largeVMargin,
                  Layout.fullWidth,
                ]}>
                <View>
                  <Input
                    value={this.state.email}
                    onChangeText={email => this.onChangeEmail(email)}
                    placeholder={t('common.email')}
                    inputStyle={[Fonts.textColor]}
                    placeholderTextColor="#fff"
                    inputContainerStyle={{borderColor: '#fff'}}
                    errorMessage={this.state.emailError}
                    errorStyle={{color: 'red'}}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <Input
                    placeholder={t('common.password')}
                    onChangeText={password => this.onChangePassword(password)}
                    value={this.state.password}
                    errorMessage={this.state.passwordError}
                    inputStyle={[Fonts.textColor]}
                    placeholderTextColor="#fff"
                    errorStyle={{color: 'red'}}
                    inputContainerStyle={{borderColor: '#fff'}}
                    rightIcon={
                      <Icon
                        onPress={this.toggleSecureText}
                        name={this.state.passwordVisible ? 'eye' : 'eye-closed'}
                        type="octicon"
                        size={30}
                        color="white"
                      />
                    }
                    secureTextEntry={
                      Platform.OS === 'ios'
                        ? !this.state.passwordVisible
                        : this.state.password.length === 0
                        ? false
                        : !this.state.passwordVisible
                    }
                  />
                </View>
                <Button
                  buttonStyle={[Common.button]}
                  title={t('login.button')}
                  disabled={
                    this.validateForm() || this.props.user.authenticatingUser
                  }
                  loading={this.props.user.authenticatingUser}
                  onPress={() => this.loginUser()}
                />
                <View
                  style={[
                    Layout.row,
                    Layout.rowCenter,
                    Gutters.regularBMargin,
                    Gutters.smallVPadding,
                    Gutters.largeTMargin,
                  ]}>
                  {this.props.resettingPassword && (
                    <ActivityIndicator color="#fff" size="small" />
                  )}
                  {!this.props.resettingPassword && (
                    <Pressable onPress={this.resetPassword}>
                      <Text
                        style={[
                          Fonts.textLarge,
                          Fonts.textColor,
                          Gutters.regularHMargin,
                          Fonts.textUnderline,
                        ]}>
                        {t('login.forgotPassword')}
                      </Text>
                    </Pressable>
                  )}
                </View>
                <View
                  style={[
                    Layout.row,
                    Layout.rowCenter,
                    Gutters.regularVPadding,
                  ]}>
                  <Text style={[Fonts.textLarge, Fonts.textColor]}>
                    {t('login.notRegisteredMessage')}
                  </Text>
                  <Pressable onPress={this.goToRegistration}>
                    <Text
                      style={[
                        Fonts.textLarge,
                        Fonts.textColor,
                        Gutters.regularHMargin,
                        Fonts.textUnderline,
                      ]}>
                      {t('login.createAccount')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    resettingPassword: state.user.isForgetPasswordLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateUser: (email, password) =>
      dispatch(authenticateUser(email, password)),
    loginAsGuest: fcmToken => dispatch(loginAsGuest(fcmToken)),
    setFireBaseToken: (authKey, fcmToken) =>
      dispatch(setFireBaseToken(authKey, fcmToken)),
    forgetPassword: email => dispatch(forgetPassword(email)),
    resetUser: () => dispatch(resetUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Login));
