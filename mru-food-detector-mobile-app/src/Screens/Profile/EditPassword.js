/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Keyboard, ScrollView, View, Platform } from 'react-native';
import { Common, Fonts, Gutters, Layout } from '../../Theme';
import { connect } from 'react-redux';
import { changePassword } from '../../Redux/actions/user';
import { Input, Button, Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import { validatePassword } from '../../Utils/Utils';
import Snackbar from 'react-native-snackbar';
import { Colors } from '../../Theme/Variables';
import { Text } from 'react-native';

const initialState = {
  password: '',
  passwordValid: false,
  passwordVisible: false,
  passwordError: '',
  passwordConfirmation: '',
  passwordConfirmationValid: false,
  passwordConfirmationError: '',
  passwordConfirmationVisible: false,
  currentPassword: '',
  currentPasswordError: '',
  currentPasswordVisible: false,
};

class EditPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  reset = async () => {
    this.setState(initialState);
  };

  onPasswordChange = (password) => {
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
    this.setState({
      passwordValid,
      password,
      passwordError,
      passwordConfirmationError:
        password !== this.state.passwordConfirmation
          ? this.props.t('errors.passwordConfirmationError')
          : '',
      passwordConfirmationValid: password === this.state.passwordConfirmation,
    });
  };

  onChangeCurrentPassword = (currentPassword) => {
    let currentPasswordError;
    if (currentPassword.trim() === '') {
      currentPasswordError = this.props.t('errors.passwordError');
    }

    this.setState({
      currentPassword,
      currentPasswordError,
    });
  };

  onChangeConfirmationPassword = (passwordConfirmation) => {
    this.setState({
      passwordConfirmation,
      passwordConfirmationError:
        this.state.password !== passwordConfirmation
          ? this.props.t('errors.passwordConfirmationError')
          : '',
      passwordConfirmationValid: this.state.password === passwordConfirmation,
    });
  };

  toggleSecureText = (index) => {
    if (index === 1) {
      this.setState({
        currentPasswordVisible: !this.state.currentPasswordVisible,
      });
    } else if (index === 2) {
      this.setState({
        passwordVisible: !this.state.passwordVisible,
      });
    } else {
      this.setState({
        passwordConfirmationVisible: !this.state.passwordConfirmationVisible,
      });
    }
  };

  validateForm = () => {
    return (
      this.state.currentPassword.trim() !== '' &&
      this.state.passwordValid &&
      this.state.passwordConfirmationValid
    );
  };

  updatePassword = () => {
    Keyboard.dismiss();
    this.props
      .changePassword(
        this.props.user.authKey,
        this.state.currentPassword,
        this.state.password,
        this.state.passwordConfirmation,
      )
      .then(() => {
        if (this.props.user.error) {
          Snackbar.show({
            backgroundColor: 'red',
            text: this.props.user.error,
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          this.reset().then(() => {
            Snackbar.show({
              backgroundColor: 'green',
              text: this.props.t('alert.passwordUpdateSuccess'),
              duration: Snackbar.LENGTH_SHORT,
            });
          });
        }
      });
  };
  render() {
    return (
      <View style={[Gutters.largeTPadding, Gutters.smallHMargin]}>
        <Text
          style={[
            Fonts.textLarge,
            {
              color: Colors.icons,
              textAlign: 'center'
            },
          ]}>
          {this.props.t('password.msg')}
        </Text>
        <ScrollView style={[Gutters.largeTPadding]} bounces={false}>
          <Input
            placeholder={this.props.t('password.currentPassword')}
            onChangeText={(password) =>
              this.onChangeCurrentPassword(password)
            }
            value={this.state.currentPassword}
            errorMessage={this.state.currentPasswordError}
            inputStyle={[
              Fonts.titleRegular,
              { color: 'grey', fontSize: 16, letterSpacing: 0 },
            ]}
            errorStyle={{ color: 'red' }}
            rightIcon={
              <Icon
                onPress={() => this.toggleSecureText(1)}
                name={
                  this.state.currentPasswordVisible
                    ? 'eye'
                    : 'eye-closed'
                }
                type="octicon"
                size={25}
                color="grey"
              />
            }
            secureTextEntry={
              Platform.OS === 'ios'
                ? !this.state.currentPasswordVisible
                : this.state.currentPassword.length === 0
                  ? false
                  : !this.state.currentPasswordVisible
            }
          />
          <Input
            placeholder={this.props.t('password.newPassword')}
            onChangeText={(password) => this.onPasswordChange(password)}
            value={this.state.password}
            errorMessage={this.state.passwordError}
            inputStyle={[
              Fonts.titleRegular,
              {
                color: Colors.greyText,
                fontSize: 16,
                letterSpacing: 0
              },
            ]}
            errorStyle={{ color: 'red' }}
            rightIcon={
              <Icon
                onPress={() => this.toggleSecureText(2)}
                name={this.state.passwordVisible ? 'eye' : 'eye-closed'}
                type="octicon"
                size={25}
                color="grey"
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
            placeholder={this.props.t('password.confirmPassword')}
            inputStyle={[
              Fonts.titleRegular,
              { color: 'grey', fontSize: 16, letterSpacing: 0 },
            ]}
            secureTextEntry={
              Platform.OS === 'ios'
                ? !this.state.passwordConfirmationVisible
                : this.state.passwordConfirmation.length === 0
                  ? false
                  : !this.state.passwordConfirmationVisible
            }
            onChangeText={(passwordConfirmation) =>
              this.onChangeConfirmationPassword(passwordConfirmation)
            }
            value={this.state.passwordConfirmation}
            errorMessage={this.state.passwordConfirmationError}
            rightIcon={
              <Icon
                onPress={() => this.toggleSecureText(3)}
                name={
                  this.state.passwordConfirmationVisible
                    ? 'eye'
                    : 'eye-closed'
                }
                type="octicon"
                size={25}
                color="grey"
              />
            }
          />
          <View
            style={[
              Gutters.extraLargeHPadding,
              Gutters.regularVMargin,
              Layout.fullWidth,
            ]}>
            <Button
              onPress={() => this.updatePassword()}
              disabled={
                !this.validateForm() || this.props.user.isChangePassword
              }
              buttonStyle={{
                ...Common.button,
                backgroundColor: '#46CE8F',
              }}
              title={this.props.t('password.update')}
              loading={this.props.user.isChangePassword}
              disabledStyle={{ backgroundColor: '#d9dbd9' }}
              disabledTitleStyle={{ color: '#b3b5b3' }}
            />
          </View>
        </ScrollView>
      </View>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (
      authKey,
      old_password,
      new_password,
      password_confirmation,
    ) =>
      dispatch(
        changePassword(
          authKey,
          old_password,
          new_password,
          password_confirmation,
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(EditPassword));
