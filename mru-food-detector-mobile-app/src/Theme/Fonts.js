/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { FontSize } from './Variables'
import { Colors } from './Variables'

export default StyleSheet.create({
  textColor: {
    color: Colors.textColor,
  },
  secondaryTextColor: {
    color: Colors.secondaryTextColor,
  },
  modalTextColor: {
    color: Colors.greyText
  },
  textTiny: {
    fontSize: FontSize.tiny
  },
  textSmall: {
    fontSize: FontSize.small,
  },
  textRegular: {
    fontSize: FontSize.regular,
  },
  textLarge: {
    fontSize: FontSize.large,
  },
  textExtraLarge: {
    fontSize: FontSize.extraLarge,
  },
  titleTiny: {
    fontSize: FontSize.small * 1.1,
    fontWeight: '400',
    color: Colors.icons
  },
  titleSmall: {
    fontSize: FontSize.small * 1.3,
    fontWeight: '400',
    color: Colors.icons
  },
  titleRegular: {
    fontSize: FontSize.regular * 2,
    fontWeight: '400',
  },
  titleLarge: {
    fontSize: FontSize.large * 2,
    fontWeight: '400',
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textUnderline: {
    textDecorationLine: 'underline'
  }
})
