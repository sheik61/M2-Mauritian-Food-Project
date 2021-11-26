import ApiClient from './axios';
class AuthAPI {
  /**
   * To Connect to the application
   * @param {string} email user's email
   * @param {string} password user's password
   */
  static login(email, password) {
    var requestBody = {
      credentials: {
        email: email,
        password: password,
      },
    };

    return ApiClient.post('user/auth/', requestBody);
  }

  static loginAsGuest(fcmToken) {
    let requestBody = {
      token: fcmToken,
    };
    return ApiClient.post('user/login_as_guest', requestBody);
  }

  /**
   * To disconnect to the application
   * @param {string} authKey token de l'utilisateur
   */
  static logout(authKey, token) {
    const requestBody = {
      token: token,
    };
    return ApiClient.post('user/logout', requestBody);
  }

  static getAllNotifications() {
    return ApiClient.get('user/notifications', '');
  }

  static saveFirebaseToken(authKey, token) {
    const requestBody = {
      registration_token: token,
    };
    return ApiClient.post('user/register_token', requestBody);
  }

  static readNotification(authKey, id) {
    return ApiClient.put('user/notifications/' + id + '/is_read', null);
  }
}
export default AuthAPI;
