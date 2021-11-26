/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { CommonActions } from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Platform,
  Keyboard,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Common, Fonts, Gutters, Layout, ModalStyle, Colors } from '../../Theme';
import { registerUser } from '../../Redux/actions/user';
import Snackbar from 'react-native-snackbar';
import { withTranslation } from 'react-i18next';
import {
  // validateUsername,
  validateEmail,
  validatePassword,
} from '../../Utils/Utils';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { userLocale } from '../../Translations/index';
import ModalCommons from '../../Components/Common/ModalCommons';
import debounce from 'lodash.debounce';
import { connectActionSheet } from '@expo/react-native-action-sheet';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      emailValid: false,
      username: '',
      firstname: '',
      usernameError: '',
      firstnameError: '',
      password: '',
      passwordError: '',
      passwordValid: false,
      passwordConfirmation: '',
      passwordConfirmationError: '',
      passwordConfirmationValid: false,
      passwordConfirmationVisible: false,
      passwordVisible: false,
      modalVisible: false,
      visible: false,

    };
  }

  goToLogin = () => {
    const { navigation } = this.props;

    navigation.dispatch(
      CommonActions.navigate({
        name: 'Login',
      }),
    );
  };

  onEmailChange = email => {
    let emailError;
    let emailValid;
    if (!validateEmail(email)) {
      emailError = this.props.t('errors.emailError');
      emailValid = false;
    } else {
      emailError = '';
      emailValid = true;
    }
    this.setState(
      {
        email,
        emailValid,
        emailError,
      },
      () => {
        this.validateRegistrationForm();
      },
    );
  };

  onChangeUsername = username => {
    let usernameError;
    if (username.trim() === '') {
      usernameError = this.props.t('errors.chooseName');
    } else {
      if (username.trim().length > 2) {
        usernameError = null;
      } else {
        usernameError = this.props.t('errors.nameError');
      }
    }
    this.setState(
      {
        username,
        usernameError,
      },
      () => {
        this.validateRegistrationForm();
      },
    );
  };

  onChangeFirstName = firstname => {
    let firstnameError;
    if (firstname.trim() === '') {
      firstnameError = this.props.t('errors.chooseName');
    } else {
      if (firstname.trim().length > 2) {
        firstnameError = null;
      } else {
        firstnameError = this.props.t('errors.nameError');
      }
    }
    this.setState(
      {
        firstname,
        firstnameError,
      },
      () => {
        this.validateRegistrationForm();
      },
    );
  };

  onPasswordChange = password => {
    let passwordError;
    let passwordValid;
    if (password.trim() === '') {
      passwordError = this.props.t('errors.passwordError');
      passwordValid = false;
    } else {
      passwordError = validatePassword(password)
        ? null
        : this.props.t('errors.enterNewPasswordError');
      passwordValid = validatePassword(password);
    }
    this.setState(
      {
        password,
        passwordError,
        passwordValid,
        passwordConfirmationError:
          password !== this.state.passwordConfirmation
            ? this.props.t('errors.passwordConfirmationError')
            : '',
        passwordConfirmationValid: password === this.state.passwordConfirmation,
      },
      () => {
        this.validateRegistrationForm();
      },
    );
  };

  onChangeConfirmationPassword = passwordConfirmation => {
    this.setState(
      {
        passwordConfirmation,
        passwordConfirmationError:
          this.state.password !== passwordConfirmation
            ? this.props.t('errors.passwordConfirmationError')
            : '',
        passwordConfirmationValid: this.state.password === passwordConfirmation,
      },
      () => {
        this.validateRegistrationForm();
      },
    );
  };

  handleChangeHandicap = value => {
    this.setState({ handicap: value });
    this.onChangeHandicapDelayed(value);
  };

  onChangeHandicap = value => {
    if (!isNaN(value) && +value >= 0 && +value <= 54) {
      if (value.startsWith('.')) {
        value = '0' + value;
      }
      this.setState(
        {
          handicap: value,
          handicapError: null,
        },
        () => this.validateRegistrationForm(),
      );
    } else {
      this.setState(
        {
          handicapError: isNaN(value)
            ? this.props.t('errors.handicapFormatError')
            : this.props.t('errors.handicapError'),
        },
        () => this.validateRegistrationForm(),
      );
    }
  };

  toggleSecureText = index => {
    if (index === 1) {
      this.setState({ passwordVisible: !this.state.passwordVisible });
    } else {
      this.setState({
        passwordConfirmationVisible: !this.state.passwordConfirmationVisible,
      });
    }
  };

  validateRegistrationForm = () => {
    return (
      this.state.emailValid &&
      !this.state.usernameError &&
      !this.state.firstnameError &&
      this.state.passwordValid &&
      this.state.passwordConfirmationValid
    );
  };

  newRegistration = () => {
    Keyboard.dismiss();

    let newUser = {
      user: {
        name: this.state.username,
        firstname: this.state.firstname,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
      },
    };

    this.props.registerUser(newUser).then(() => {
      if (this.props.user.error) {
        Snackbar.show({
          backgroundColor: 'red',
          text: this.props.user.error,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        this.setModalVisible(true);
      }
    });
  };

  setModalVisible = show => {
    this.setState({ modalVisible: show });
  };

  _onOpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = [
      this.props.t('registration.category.man'),
      this.props.t('registration.category.woman'),
      this.props.t('common.cancel'),
    ];
    //const destructiveButtonIndex = 3;
    const cancelButtonIndex = 3;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        //destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex !== 2) {
          let category = '';
          if (buttonIndex === 0) {
            category = this.props.t('registration.category.man');
          } else if (buttonIndex === 1) {
            category = this.props.t('registration.category.woman');
          }
          this.setState(
            {
              categoryIndex: buttonIndex,
              category,
            },
            () => {
              this.validateRegistrationForm;
            },
          );
        }
        // Do something here depending on the button index selected
      },
    );
  };

  render() {
    const { t } = this.props;
    const image = require('../../Assets/Images/mru-flag.png');
    return (
      <ImageBackground source={image} style={Common.image} blurRadius={40}>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={true}
          style={[
            Layout.fullHeight,
            Gutters.largeVPadding,
            Gutters.regularHPadding,
          ]}>
          <View style={[Gutters.smallHPadding]}>
            <Text style={[Fonts.titleLarge, Fonts.textLeft, Fonts.textColor]}>
              {t('registration.title')}
            </Text>
          </View>

          <View
            style={[
              Layout.fill,
              Gutters.largeTPadding,
              Layout.justifyContentAround,
            ]}>
            <View
              style={[
                Gutters.smallHPadding,
                Gutters.largeVMargin,
                Layout.fullWidth,
              ]}>
              <View style={[Gutters.largeBMargin]}>
                <Input
                  placeholder={t('common.name')}
                  value={this.state.username}
                  onChangeText={username => this.onChangeUsername(username)}
                  labelStyle={{ color: 'red' }}
                  errorMessage={this.state.usernameError}
                  inputStyle={[Fonts.textColor]}
                  placeholderTextColor="#fff"
                  inputContainerStyle={{ borderColor: '#fff' }}
                  autoCapitalize="none"
                  errorStyle={null}
                />

                <Input
                  placeholder={t('common.firstname')}
                  value={this.state.firstname}
                  onChangeText={firstname => this.onChangeFirstName(firstname)}
                  labelStyle={{ color: 'red' }}
                  errorMessage={this.state.firstnameError}
                  inputStyle={[Fonts.textColor]}
                  placeholderTextColor="#fff"
                  inputContainerStyle={{ borderColor: '#fff' }}
                  autoCapitalize="none"
                  errorStyle={null}
                />
                <Input
                  value={this.state.email}
                  onChangeText={email => this.onEmailChange(email)}
                  placeholder={t('common.email')}
                  errorMessage={this.state.emailError}
                  inputStyle={[Fonts.textColor]}
                  placeholderTextColor="#fff"
                  inputContainerStyle={{ borderColor: '#fff' }}
                  errorStyle={{ color: 'red' }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <Input
                  placeholder={t('common.password')}
                  onChangeText={password => this.onPasswordChange(password)}
                  value={this.state.password}
                  errorMessage={this.state.passwordError}
                  inputStyle={[Fonts.textColor]}
                  placeholderTextColor="#fff"
                  inputContainerStyle={{
                    borderColor: '#fff',
                    ...Gutters.smallTMargin,
                  }}
                  errorStyle={{ color: 'red' }}
                  rightIcon={
                    <Icon
                      onPress={() => this.toggleSecureText(1)}
                      name={this.state.passwordVisible ? 'eye' : 'eye-closed'}
                      type="octicon"
                      size={25}
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
                <Input
                  placeholder={t('password.confirmPassword')}
                  placeholderTextColor="#fff"
                  inputStyle={[Fonts.textColor]}
                  inputContainerStyle={{ borderColor: '#fff' }}
                  secureTextEntry={
                    Platform.OS === 'ios'
                      ? !this.state.passwordConfirmationVisible
                      : this.state.passwordConfirmation.length === 0
                        ? false
                        : !this.state.passwordConfirmationVisible
                  }
                  value={this.state.passwordConfirmation}
                  onChangeText={passwordConfirmation =>
                    this.onChangeConfirmationPassword(passwordConfirmation)
                  }
                  errorMessage={this.state.passwordConfirmationError}
                  rightIcon={
                    <Icon
                      onPress={() => this.toggleSecureText(2)}
                      name={
                        this.state.passwordConfirmationVisible
                          ? 'eye'
                          : 'eye-closed'
                      }
                      type="octicon"
                      size={25}
                      color="white"
                    />
                  }
                />
              </View>
              <View style={[Gutters.regularBMargin]}>
                <Button
                  buttonStyle={[Common.button]}
                  title={t('registration.button')}
                  disabled={
                    !this.validateRegistrationForm() ||
                    this.props.user.isLoadingUser
                  }
                  loading={this.props.user.isLoadingUser}
                  onPress={this.newRegistration}
                />
              </View>
              <View
                style={[
                  Layout.row,
                  Layout.rowCenter,
                  Gutters.regularBMargin,
                  Gutters.regularVPadding,
                ]}>
                <Text style={[Fonts.textLarge, Fonts.textColor]}>
                  {t('registration.alreadyHaveAnAccount')}
                </Text>
                <Pressable onPress={this.goToLogin}>
                  <Text
                    style={[
                      Fonts.textLarge,
                      Fonts.textColor,
                      Gutters.regularHMargin,
                      Fonts.textUnderline,
                    ]}>
                    {t('login.button')}
                  </Text>
                </Pressable>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              visible
              dismiss={() => this.setModalVisible(false)}>
              <TouchableOpacity style={[Layout.fill]} activeOpacity={1}>
                <View
                  style={[
                    Layout.fill,
                    Layout.colCenter,
                    { backgroundColor: '#000000aa' },
                  ]}>
                  <View style={[ModalStyle.modalView]}>
                    <View style={{ ...Layout.alignItemsCenter }}>
                      <ModalCommons
                        title={t('registration.modal.title')}
                        subTitle={
                          this.props?.user?.guestMessage
                            ? t('registration.guestSpotSignUpMessage')
                            : t('registration.signupMessage')
                        }
                      />
                      <Button
                        title={t('common.ok')}
                        onPress={this.goToLogin}
                        buttonStyle={[
                          Common.button,
                          Gutters.regularVMargin,
                          Gutters.extraLargeHPadding,
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: user => dispatch(registerUser(user)),
  };
};

const ConnectedRegistration = connectActionSheet(Registration);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ConnectedRegistration));
