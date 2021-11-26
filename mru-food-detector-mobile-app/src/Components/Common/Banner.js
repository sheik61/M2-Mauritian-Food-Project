import React from 'react';
import { View, Text, } from 'react-native-animatable';
import moment from 'moment';
import { userLocale } from '../../Translations';
import { Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Colors } from '../../Theme/Variables';
import { Layout, Gutters } from '../../Theme';

export const Banner = (props) => {
  return (
    <View style={[Layout.fullWidth, props?.bottom ? { position: 'absolute', bottom: 0 } : null]}>
      <View
        style={[
          Layout.justifyContentBetween,
          Gutters.tinyPadding,
          Gutters.regularHPadding,
          Layout.row,
          Layout.alignItemsCenter,
          Layout.shadow,
          {
            backgroundColor: Colors.lightGrey,
            borderTopWidth: 0.2,
            borderTopColor: 'lightGrey',
          },
        ]}>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Icon
            name="trophy"
            size={30}
            type="ionicon"
            color={Colors.gold}
            style={[Gutters.smallRMargin]}
          />
          <Text style={{ color: Colors.greyText }}>{props?.name}</Text>
        </View>
        <Text style={{ color: Colors.greyText }}>
          {props?.date
            ? moment(props?.date).format(
              userLocale === 'en_US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY',
            )
            : ''}
        </Text>
      </View>
    </View>)
}


export default connect(
  null,
  null,
)(withTranslation()(Banner));
