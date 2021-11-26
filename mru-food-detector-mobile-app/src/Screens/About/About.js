/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Linking, Alert } from 'react-native';
import { Fonts, Gutters, Layout } from '../../Theme';
import { withTranslation } from 'react-i18next';
import { Colors } from '../../Theme/Variables';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

export class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }


  openLink = url => {
    const supported = Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(`Don’t know how to open this URL: ${url}`);
    }
  };

  render() {
    const { t } = this.props;

    const list = [
      {
        id: 2,
        title: t('about.legalNotice'),
        icon: 'newspaper',
        showChevron: true,
        onPress: () => this.openLink(t('about.links.legalNotice')),
      },
      {
        id: 3,
        title: t('about.privacyPolicy'),
        icon: 'document',
        onPress: () => this.openLink(t('about.links.privacyPolicy')),
        showChevron: true,
      },
    ];

    return (
      <View
        style={[
          Layout.fullWidth,
          Layout.alignItemsCenter,
          Layout.justifyContentCenter,
          Gutters.regularTPadding,
        ]}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            containerStyle={{
              ...Layout.fullWidth,
              ...Gutters.smallHMargin,
              backgroundColor: Colors.transparent,
            }}
            onPress={item.onPress}
            underlayColor={Colors.transparent}>
            <Icon
              name={item.icon}
              onPress={item.onPress}
              type={'ionicon'}
              color={this.props.colors.text}
            />
            <ListItem.Content
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Layout.alignItemsCenter,
              ]}>
              <ListItem.Title
                onPress={item.onPress}
                style={{ color: this.props.colors.text }}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
            {item.value && (
              <Text style={[Fonts.textRegular, { color: Colors.greyText }]}>
                {item.value}
              </Text>
            )}
            {item.showChevron && (
              <ListItem.Chevron
                onPress={item.onPress}
                name="chevron-forward-outline"
                type="ionicon"
                color={this.props.colors.text}
              />
            )}
          </ListItem>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    colors: state.theme.colors,
  };
};

export default connect(mapStateToProps, null)(withTranslation()(About));
