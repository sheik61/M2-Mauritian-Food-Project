//import ApiService from './ApiService';
import { uudiv4 } from '../Utils/Utils';
import ApiClient from './axios';
import ApiService from './ApiService';
class UserAPI {
  // retrieves user from its popkey with timeout
  static getCurrentUserWithTimeout(authKey, timeout) {
    return ApiClient.getWithTimeout('user', '', timeout);
  }

  // retrieves user from its popkey
  static getCurrentUser() {
    return ApiClient.get('user');
  }

  // updates user location
  static updateLocation(location) {
    return ApiClient.patch('user/save_user_location', location);
  }

  /**
   * Create a user
   * @param {*} type User's type (Particular or Establishment)
   * @param {*} email User's email
   * @param {*} password User's password
   * @param {*} confirmation User's password confirmation
   * @param {*} userInfo User's personal information
   */
  static registerUser(user) {
    return ApiService.post(null, 'user/signup/', user);
  }

  /**
   * UPDATE USER
   * @param {string} authKey user's token
   * @param {object} user User's info
   */
  static updateUser(user) {
    return ApiClient.put('user', user);
  }

  /**
   * Create user from facebook
   * @param {string} userEmail user's email
   * @param {string} userName user's name
   * @param {string} userFirstName user's first name
   * @param {string} fbToken fb token
   * @param {string} facebookID facebook id
   */
  static registerUserFB(
    userEmail,
    userName,
    userFirstName,
    fbToken,
    facebookID,
    deviceToken,
  ) {
    var requestBody;
    requestBody = {
      user: {
        email: userEmail,
        firstname: userFirstName,
        name: userName,
        facebook_id: facebookID,
        facebook_token: fbToken,
        token: deviceToken,
      },
    };
    return ApiService.post(null, 'user/signup/fb', requestBody);
  }

  /**
   * Create user from Apple
   * @param {string} userToken user's token
   * @param {string} userIdentity user's id
   * @param {string} userFirstName user's firstname
   * @param {string} userName user's name
   */
  static registerUserApple(
    userToken,
    userIdentity,
    userFirstName,
    userName,
    deviceToken,
  ) {
    let requestBody;
    requestBody = {
      user: {
        jwt: userToken,
        user_identity: userIdentity,
        firstname: userFirstName,
        name: userName,
        token: deviceToken,
      },
    };

    return ApiService.post(null, 'user/signup/apple', requestBody);
  }

  /**
   * Create user from Google
   * @param {string} userToken user's token
   * @param {string} userIdentity user's id
   * @param {string} userEmail user's email
   * @param {string} userFirstName user's firstname
   * @param {string} userName user's name
   */
  static registerUserGoogle(
    userToken,
    userIdentity,
    userEmail,
    userFirstName,
    userName,
    deviceToken,
  ) {
    let requestBody;
    requestBody = {
      user: {
        jwt: userToken,
        user_identity: userIdentity,
        user_email: userEmail,
        firstname: userFirstName,
        name: userName,
        token: deviceToken,
      },
    };

    return ApiService.post(null, 'user/signup/google', requestBody);
  }

  /**
   * Reinitalise password
   * @param {*} email user's email
   */
  static forgetPassword(email) {
    return ApiService.post(null, 'user/reset_password?email=' + email, '');
  }

  /**
   * Change user's password
   * @param {string} authKey user's token
   * @param {string} password user's old password
   * @param {string} new_password user's new password
   * @param {string} password_confirmation user's password confirmation
   */
  static changePassword(
    password,
    new_password,
    password_confirmation,
  ) {
    let requestBody = {
      user: {
        password,
        new_password,
        password_confirmation,
      },
    };
    return ApiClient.put('user/pwd/update', requestBody);
  }


   /**
   * Upload user's avatar
   * @param {string} authKey user's token
   * @param {object} response meta data of photo
   */
    static predictImage(authKey, response) {
      let data = new FormData();
      let splitFileName = response.path.split('.');
      let imgType = splitFileName[splitFileName.length - 1];
      const name = uudiv4() + '.' + imgType;
      data.append('image', {
        uri: response.path,
        name: name,
        type: response.mime ? response.mime : imgType,
      });
      return ApiService.post_image(authKey, 'imageclassifier/predict', data);
    }



  /**
   * Send Bug Report
   * @param {string} authKey user's token
   * @param {object} payload
   */
  static sendBug(authKey, payload) {
    let data = new FormData();
    if (payload.imageResponses.length > 0) {
      payload.imageResponses.map((response, index) => {
        let imageUri = response.uri;
        data.append(`bug_report[bug_image_${index + 1}]`, {
          uri: imageUri,
          name: imageUri.split('/').pop(),
          type: response.type,
        });
      });
    }
    data.append('bug_report[description]', payload.description);

    return ApiService.post_image(authKey, 'user/report_bug', data);
  }


  static createPost(authKey, payload) {
    let data = new FormData();
    if (payload && payload.photo != null) {
      let splitFileName = payload && payload.photo && payload.photo.path.split('.');
      let imgType = splitFileName[splitFileName.length - 1];
      const name = uudiv4() + '.' + imgType;
      data.append('post[photo]', {
        uri: payload && payload.photo && payload.photo.path,
        name: name,
        type: payload && payload.photo && payload.photo.mime ? payload && payload.photo && payload.photo.mime : imgType,
      });
    }

    if (payload && payload.description !== null) {
      data.append('post[description]', payload && payload.description);
    }
    data.append('post[share_all_scores]', payload && payload.share_all_scores);
    data.append('post[golf_club_id]', payload && payload.golf_club_id);
    data.append('post[user_score_id]', payload && payload.user_score_id);
    data.append('post[golf_club_ball_id]', payload && payload.golf_club_ball_id);
    return ApiService.post_image(authKey, 'post/new', data);
  }

  static resetPassword(authKey, email) {
    return ApiClient.post('user/reset_password?email=' + email, '');
  }

  static getAllNotifications(authKey, page, limit) {
    return ApiClient.get(
      'user/notifications?offset=' + page + '&limit=' + limit,
      '',
    );
  }

  static saveFirebaseToken(authKey, token) {
    const requestBody = {
      registration_token: token,
    };
    return ApiClient.post('firebase/register_token', requestBody);
  }
}

export default UserAPI;
