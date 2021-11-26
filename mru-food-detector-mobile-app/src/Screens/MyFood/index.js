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
import { Layout,Gutters } from '../../Theme';

import { logout } from '../../Redux/actions/user';
import { connect } from 'react-redux';




const MyFood = ({ navigation, colors }) => {
    const { t } = useTranslation();


    useEffect(() => { }, []);
    
    return (
        <View
            style={[
                Layout.fullHeight,
            ]}>
            <View style={[Gutters.regularTPadding, Gutters.smallHMargin]}>
               
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

export default connect(mapStateToProps, mapDispatchToProps)(MyFood);
