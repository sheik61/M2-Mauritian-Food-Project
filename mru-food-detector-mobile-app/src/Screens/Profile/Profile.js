/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Layout, Fonts, Gutters, ModalStyle, Common } from '../../Theme';
import { ListItem, Icon, Button } from 'react-native-elements';
import { logout } from '../../Redux/actions/user';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import ApiService from '../../Services/ApiService';
import Snackbar from 'react-native-snackbar';
import ModalCommons from '../../Components/Common/ModalCommons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { userLocale } from '../../Translations';


const Profile = ({ navigation, logout, user, loggedInAsGuest, colors }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState(null);
  const [maxBadRating] = useState(4);
  const [showRatingDislike, setShowRatingDislike] = useState(false);

  const generateList = () => {
    let list = [];

    list = [
      {
        id: 1,
        title: t('userAccount.myAccount'),
        icon: 'person-outline',
        showChevron: true,
        onPress: () => goToMyAccount(),
      },
      {
        id: 2,
        showChevron: true,
        title: t('userAccount.aboutApp'),
        icon: 'information-circle-outline',
        onPress: () => goToAboutUs(),
      },
      {
        id: 6,
        title: t('userAccount.signOut'),
        icon: 'log-out-outline',
        onPress: () => userSignOut(),
      },
    ];


    return list;
  };

  const goToAboutUs = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'About',
      }),
    );
  };



  const userSignOut = () => {
    logout(user.authKey, user.token);
  };

  const goToMyAccount = () => {
    let guestLogin = user && user.currentUser && user.currentUser.is_guest;
    if (!guestLogin) {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'MyAccount',
        }),
      );
    } else {
      showModal();
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const goHome = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      }),
    );
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const goToLogin = () => {
    logout(user.authKey, user.token);
    // navigation.navigate('Login', {screen: 'Login'});
  };

  const showRateModal = () => {
    setRateModalVisible(true);
  };


  useEffect(() => { }, []);

  const list = generateList();

  return (

    <View
      style={[
        Layout.fullHeight,
      ]}>
      <View style={[Gutters.regularTPadding, Gutters.smallHMargin]}>
        <View>
          {list.map((item, i) => (
            <ListItem
              key={i}
              onPress={item.onPress}
              underlayColor={Colors.transparent}
              containerStyle={{ backgroundColor: Colors.transparent }}>
              <Icon name={item.icon} type="ionicon" color={colors.text} />
              <ListItem.Content>
                <ListItem.Title
                  style={{ color: colors.text, width: '100%' }}>
                  {item.title}
                </ListItem.Title>
              </ListItem.Content>
              {item.value && (
                <Text style={[{ color: colors.text }, Fonts.textRegular]}>
                  {item.value}
                </Text>
              )}
              {item.showChevron && (
                <ListItem.Chevron
                  name="chevron-forward-outline"
                  type="ionicon"
                  color={colors.text}
                />
              )}
            </ListItem>
          ))}

        </View>
      </View>
    </View>

  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    loggedInAsGuest: state.user.loggedInAsGuest,
    colors: state.theme.colors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: (authKey, token) => dispatch(logout(authKey, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
