import React from 'react';
import {View} from 'react-native';
import {Gutters, Fonts} from '../../Theme';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {updateCurrentUser} from '../../Redux/actions/user';
import {withTranslation} from 'react-i18next';

class EditUserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.currentUser?.firstname || '',
      lastName: this.props.user.currentUser?.name || '',
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  onChangeFirstName = (firstName) => {
    this.setState({firstName});
  };

  onChangeLastName = (lastName) => {
    this.setState({lastName});
  };

  updateFirstName = () => {
    if (this.state.firstName.trim() === '') {
      this.setState({firstName: this.props.user.currentUser.firstname});
      return;
    }
    let currentUser = {
      user: {
        firstname: this.state.firstName,
      },
    };
    this.props.updateCurrentUser(this.props.user.authKey, currentUser);
  };

  updateLastName = () => {
    if (this.state.lastName.trim() === '') {
      this.setState({lastName: this.props.user.currentUser.name});
      return;
    }

    let currentUser = {
      user: {
        name: this.state.lastName,
      },
    };
    this.props.updateCurrentUser(this.props.user.authKey, currentUser);
  };
  render() {
    const {t} = this.props;
    return (
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '50%',
          },
          Gutters.regularTPadding,
        ]}>
        <Input
          value={this.state.firstName}
          onChangeText={(firstName) => this.onChangeFirstName(firstName)}
          placeholder={t('user.firstName')}
          placeholderTextColor={this.props.colors.background}
          inputContainerStyle={{borderColor: 'transparent'}}
          onSubmitEditing={() => this.updateFirstName()}
          inputStyle={[
            {textAlign: 'right', color: this.props.colors.textColor},
            Fonts.titleRegular,
          ]}
          errorStyle={{color: 'red'}}
          onBlur={() => this.updateFirstName()}
          disabled={this.props.loggedInAsGuest}
        />
        <Input
          value={this.state.lastName}
          onChangeText={(lastName) => this.onChangeLastName(lastName)}
          inputStyle={[Fonts.titleRegular,  {color:  this.props.colors.textColor}]}
          inputContainerStyle={{borderColor: 'transparent'}}
          onSubmitEditing={() => this.updateLastName()}
          placeholder={t('user.lastName')}
          placeholderTextColor="#fff"
          errorStyle={{color: 'red'}}
          onBlur={() => this.updateLastName()}
          disabled={this.props.loggedInAsGuest}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loggedInAsGuest: state.user.loggedInAsGuest,
    colors: state.theme.colors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (authKey, user) =>
      dispatch(updateCurrentUser(authKey, user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(EditUserName));
