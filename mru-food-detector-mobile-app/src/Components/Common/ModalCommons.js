import React from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Colors } from '../../Theme/Variables';
import { Layout, Gutters, Fonts } from '../../Theme';

export const ModalCommons = (props) => {
    return (
        <>
            {props.icon && <Icon
                name={props.icon}
                size={props.iconSize || 50}
                type="material-icons"
                color={Colors.primary}
                style={[Gutters.regularBMargin]}
            />}
            <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                textBreakStrategy="simple"
                style={[
                    Fonts.textExtraLarge,
                    Fonts.textCenter,
                    Gutters.regularBMargin,
                    { fontWeight: 'bold', color: props.titleColor ? props.titleColor : Colors.greyText },
                ]}>
                {props.title}
            </Text>
            <Text
                style={[
                    Fonts.textLarge,
                    Fonts.textCenter,
                    Fonts.modalTextColor,
                    Gutters.regularBMargin,
                ]}>
                {props.subTitle}
            </Text>
        </>
    )
}

// ModalCommons.defaulProps = {
//     showSubtitle: true
// }


export default connect(
    null,
    null,
)(withTranslation()(ModalCommons));
