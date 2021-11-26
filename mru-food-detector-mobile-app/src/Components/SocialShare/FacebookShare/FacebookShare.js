import React from 'react';
import {Icon} from 'react-native-elements';
import {ShareDialog} from 'react-native-fbsdk';

export class FacebookShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareLinkContent: {
        contentType: 'link',
        contentUrl: 'https://www.facebook.com/',
        contentDescription: 'Facebook sharing is easy!',
      },
    };
  }

  onFacebookShare = () => {
    var tmp = this;

    ShareDialog.canShow(this.state.shareLinkContent)
      .then(function (canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      })
      .then(
        function (result) {
          if (result.isCancelled) {
            alert('Share cancelled');
          } else {
            alert('Share success with postId: ' + result.postId);
          }
        },
        function (error) {
          alert('Share fail with error: ' + error);
        },
      );
  };

  render() {
    return (
      <Icon
        name="logo-facebook"
        size={50}
        type="ionicon"
        color={'#fff'}
        disabled={this.props.disabled}
        onPress={this.onFacebookShare}
      />
    );
  }
}

export default FacebookShare;
