/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Common, Fonts, Gutters, Layout } from '../../Theme';
import { withTranslation } from 'react-i18next';
import { Colors, FontSize } from '../../Theme/Variables';
import { ListItem, Icon, Input, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { updateCurrentUser } from '../../Redux/actions/user';
import Snackbar from 'react-native-snackbar';
import { validateEmail } from '../../Utils/Utils';
import { userLocale } from '../../Translations/index';
import { COUNTRIES } from '../../Translations/index';
import debounce from 'lodash.debounce';
import { connectActionSheet } from '@expo/react-native-action-sheet';

export class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    let countrySelected = COUNTRIES.find(
      (e, i) => e.alpha2 === this.props.user.currentUser.country,
    );
    let country = (countryName = '');
    if (countrySelected) {
      country = countrySelected.alpha2;
      countryName = countrySelected.name;
    }

    this.state = {
      email: this.props.user?.currentUser?.email || '',
      emailError: null,
      handicapError: null,
      socialLogin: false,
      username: this.props.user?.currentUser?.name || '',
      usernameError: null,
      category: this.props.user?.currentUser?.category
        ? this.props.t(
          `registration.category.${[this.props.user?.currentUser?.category]}`,
        )
        : '' || '',
      categoryIndex: this.props.user?.currentUser?.category || '',
      showActions: false,
      handicap: this.props.user?.currentUser?.handicap || '',
      prevHandicap: this.props.user?.currentUser?.handicap || '',
      checked: this.props?.user?.currentUser?.notifications_allowed,
      countryPickerVisible: false,
      country,
      countryName,
      licenceNo: this.props.user?.currentUser?.licence_no || '',
      licenceNoError: null,
    };
    this.onChangeHandicapDelayed = debounce(this.onChangeHandicap, 0);
  }

  componentDidMount() {
    this.setSocialLogin();
  }

  goToEditPassword = () => {
    const { navigation } = this.props;
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditPassword',
      }),
    );
  };

  onChangeKey = licenceNo => {
    this.setState({
      licenceNo,
      showActions: true,
    });
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

    this.setState({
      username,
      usernameError,
      showActions: true,
    });
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

          this.setState({
            categoryIndex: buttonIndex,
            category,
            showActions: true,
          });
        }
      },
    );
  };

  onChangeHandicap = value => {
    if (!isNaN(value) && +value >= 0 && +value <= 54) {
      if (value.startsWith('.')) {
        value = '0' + value;
      }
      this.setState({ handicap: value, handicapError: null, showActions: true });
    } else {
      this.setState({
        handicapError: isNaN(value)
          ? this.props.t('errors.handicapFormatError')
          : this.props.t('errors.handicapError'),
      });
    }
  };

  setSocialLogin = () => {
    if (
      this.props.currentUser.google_id ||
      this.props.currentUser.facebook_id ||
      this.props.currentUser.apple_id
    ) {
      this.setState({ socialLogin: true });
    }
  };

  onChangeEmail = async email => {
    let emailError;
    emailError = validateEmail(email)
      ? null
      : this.props.t('errors.emailError');

    this.setState({
      email,
      emailError,
      showActions: true,
    });
  };

  formatHandicap = async () => {
    if (this.state.handicap && this.state.handicap.endsWith('.')) {
      this.setState({ handicap: this.state.handicap + '0' });
    }
  };

  saveUserDetails = async () => {
    Keyboard.dismiss();
    await this.formatHandicap();

    let currentUser = {
      user: {
        name: this.state.username,
        country: this.state.country,
        category: this.state.categoryIndex,
        notifications_allowed: this.state.checked,
        ...(this.state.handicap === ''
          ? null
          : { handicap: this.state.handicap }),
        licence_no: this.state.licenceNo,
      },
    };

    this.props
      .updateCurrentUser(this.props.user.authKey, currentUser)
      .then(() => {
        if (this.props.user.error) {
          Snackbar.show({
            duration: Snackbar.LENGTH_SHORT,
            text: this.props.user.error,
            backgroundColor: 'red',
          });
        } else {
          this.setState(
            {
              showActions: false,
            },
            () => {
              Snackbar.show({
                duration: Snackbar.LENGTH_SHORT,
                text: this.props.t('alert.updateSuccess'),
                backgroundColor: 'green',
              });
            },
          );
        }
      });
  };

  generateList = () => {
    let list = [];
    list = [
      {
        id: 1,
        title: 'Email',
        icon: 'mail-outline',
      },
      {
        id: 2,
        title: this.props.t('common.name'),
        icon: 'person-outline',
      },
      {
        id: 5,
        title: this.props.t('common.password'),
        icon: 'lock-closed-outline',
        showChevron: true,
        onPress: () => this.goToEditPassword(),
      },
      {
        id: 6,
        title: this.props.t('notifications.title'),
        icon: 'notifications-outline',
        showChevron: false,
      },
    ];

    return list;
  };




  render() {
    const list = this.generateList();
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={80} // adjust the value here if you need more padding
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[Gutters.smallHMargin]}>
            {list.map((item, i) => (
              <View key={i}>
                <ListItem
                  key={i}
                  containerStyle={{
                    backgroundColor: Colors.transparent,
                    paddingBottom: 5,
                    ...([1, 2].includes(item.id) && { paddingBottom: 10 }),
                  }}
                  onPress={item.onPress}
                  underlayColor={Colors.transparent}>
                  <View
                    style={[
                      Layout.row,
                      Layout.justifyContentBetween,
                      Layout.fullWidth,
                    ]}>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                      <Icon
                        name={item.icon}
                        type="ionicon"
                        color={this.props.colors.text}
                        style={[Gutters.smallRMargin]}
                      />
                      <Text>{item.title}</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsEnd]}>
                      {item.id === 1 && (
                        <View style={{ width: 250 }}>
                          <Text
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            textBreakStrategy="simple"
                            style={[
                              Fonts.textRegular,
                              {
                                color: Colors.greyText,
                                textAlign: 'right',
                              },
                            ]}>
                            {this.state.socialLogin &&
                              !this.props.currentUser.email
                              ? 'N/A'
                              : this.props.currentUser.email}
                          </Text>
                        </View>
                      )}
                      {item.id === 2 && (
                        <Input
                          onChangeText={username =>
                            this.onChangeUsername(username)
                          }
                          containerStyle={{
                            paddingRight: 0,
                            height: 30,
                          }}
                          style={[Fonts.textRegular, { color: 'black' }]}
                          inputStyle={[
                            { textAlign: 'right', paddingRight: 5 },
                            Fonts.titleRegular,
                            Fonts.textColor,
                          ]}
                          inputContainerStyle={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 1,
                            borderColor: Colors.mruFoodGreen,
                            borderRadius: 10,
                            width: 210,
                            height: 30,
                          }}
                          value={this.state.username}
                          autoCapitalize="none"
                          multiline={false}
                          maxLength={30}
                          numberOfLines={1}
                          textAlignVertical="center"
                          textBreakStrategy="simple"
                          disabled={this.props.user.isUpdatingUser}
                        />
                      )}

                      {item.id === 8 && (
                        <TouchableOpacity
                          style={{
                            ...Layout.justifyContentCenter,
                            ...Gutters.smallBPadding,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingRight: 0,
                            borderWidth: 1,
                            borderColor: Colors.mruFoodGreen,
                            borderRadius: 10,
                            width: 210,
                            height: 30,
                          }}
                          disabled={this.props.user.isUpdatingUser}
                          onPress={this._onOpenActionSheet}>
                          <Text
                            style={{
                              textAlign: 'right',
                              ...Gutters.tinyHPadding,
                              color: this.props.user.isUpdatingUser
                                ? 'grey'
                                : 'black',
                            }}>
                            {this.state.category || ''}
                          </Text>
                        </TouchableOpacity>
                        // <Input
                        //   onChangeText={username =>
                        //     this.onChangeUsername(username)
                        //   }
                        //   containerStyle={{
                        //     paddingRight: 0,
                        //     height: 30,
                        //   }}
                        //   style={[Fonts.textRegular, { color: 'black' }]}
                        //   inputStyle={[
                        //     { textAlign: 'right', paddingRight: 5 },
                        //     Fonts.titleRegular,
                        //     Fonts.textColor,
                        //   ]}
                        //   inputContainerStyle={{
                        //     paddingTop: 0,
                        //     paddingBottom: 0,
                        //     borderWidth: 1,
                        //     borderColor: Colors.mruFoodGreen,
                        //     borderRadius: 10,
                        //     width: 210,
                        //     height: 30,
                        //   }}
                        //   value={this.state.username}
                        //   autoCapitalize="none"
                        //   multiline={false}
                        //   maxLength={30}
                        //   numberOfLines={1}
                        //   textAlignVertical="center"
                        //   textBreakStrategy="simple"
                        //   disabled={this.props.user.isUpdatingUser}
                        // />
                      )}



                      {/* </ListItem.Content> */}
                      {item.showChevron && (
                        <ListItem.Chevron
                          onPress={item.onPress}
                          name="chevron-forward-outline"
                          type="ionicon"
                          color={this.props.colors.text}
                        />
                      )}
                      {item.value && (
                        <Text
                          style={[Fonts.textRegular, { color: Colors.greyText }]}>
                          {item.value}
                        </Text>
                      )}
                    </View>
                  </View>
                </ListItem>
                {this.state.usernameError && item.id === 2 && (
                  <Text
                    style={{
                      color: Colors.red,
                      ...Gutters.regularLPadding,
                      fontSize: FontSize.small,
                    }}>
                    {this.state.usernameError}
                  </Text>
                )}
              </View>
            ))}

            <View
              style={[
                Layout.fullWidth,
                Layout.row,
                Layout.justifyContentCenter,
              ]}>
              <TouchableOpacity
                onPress={() => this.saveUserDetails()}
                disabled={
                  this.state.emailError !== null ||
                  this.state.usernameError !== null ||
                  this.state.handicapError !== null ||
                  !this.state.showActions ||
                  this.props.user.isUpdatingUser
                }
                style={
                  this.state.emailError !== null ||
                    this.state.usernameError !== null ||
                    this.state.handicapError !== null ||
                    !this.state.showActions ||
                    this.props.user.isUpdatingUser
                    ? [
                      Common.button,
                      Gutters.regularVMargin,
                      Gutters.extraLargeHPadding,
                      { backgroundColor: Colors.mruFoodDisabled },
                    ]
                    : [
                      Common.button,
                      Gutters.regularVMargin,
                      Gutters.extraLargeHPadding,
                      { backgroundColor: Colors.mruFoodGreen },
                    ]
                }>
                <Text
                  style={
                    this.state.emailError !== null ||
                      this.state.usernameError !== null ||
                      this.state.handicapError !== null ||
                      !this.state.showActions ||
                      this.props.user.isUpdatingUser
                      ? [
                        Fonts.textLarge,
                        {
                          color: '#b3b5b3',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginVertical: 10,
                        },
                      ]
                      : [
                        Fonts.textLarge,
                        {
                          color: Colors.white,
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginVertical: 10,
                        },
                      ]
                  }>
                  {this.props.t('common.update')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentUser: state.user.currentUser,
    darkMode: state.theme.darkMode,
    colors: state.theme.colors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentUser: (authKey, user) =>
      dispatch(updateCurrentUser(authKey, user)),
  };
};

const ConnectedMyACcount = connectActionSheet(MyAccount);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ConnectedMyACcount));
