/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Text, Platform} from 'react-native';
import {Gutters, Layout, Fonts} from '../../../Theme';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Input} from 'react-native-elements';

function MyAccount(props) {
  const {t} = useTranslation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View
        style={[
          Layout.fullHeight,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <View style={{flex: 1, backgroundColor: '#46CE8F', width: '100%'}}>
          <View
            style={[
              {
                flex: 1,
                backgroundColor: props.colors.background,
                borderTopLeftRadius: 60,
              },
            ]}>
            <View style={[Gutters.regularTPadding, Gutters.smallHMargin]}>
              {props.children}
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = state => {
  return {
    colors: state.theme.colors,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
