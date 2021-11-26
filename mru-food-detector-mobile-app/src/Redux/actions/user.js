import UserAPI from '../../Services/UserApi';
import AuthAPI from '../../Services/AuthApi';
import AsyncStorage from '@react-native-community/async-storage';

import * as types from '../../constants';

// Reset previous user state
export const resetUser = () => {
  return (dispatch) => {
    dispatch({
      type: types.RESET_USER_SUCCESS,
    });
  };
};

export const increaseSpotCount = () => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_SPOT_COUNT,
    });
  };
}


// Logs a user with email/pwd
export const authenticateUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: types.AUTHENTICATE_USER_LOADING });
    return AuthAPI.login(email, password)
      .then((data) => {
        if (data.errors) {
          dispatch({
            type: types.AUTHENTICATE_USER_ERROR,
            error: data.errors[0].details,
          });
        } else {
          AsyncStorage.setItem('authKey', data.auth_token);
          dispatch({
            type: types.AUTHENTICATE_USER_SUCCESS,
            currentUser: data,
            authKey: data.auth_token,
          });
        }
      })
      .catch((error) => {
        // throw error;
        dispatch({
          type: types.AUTHENTICATE_USER_ERROR,
          error: error,
        });
      });
  };
};

export function setFireBaseToken(authKey, token) {
  return (dispatch) => {
    AsyncStorage.setItem('token', token);
    dispatch({
      type: types.SET_FIREBASE_TOKEN,
      token: token,
    });
    AuthAPI.saveFirebaseToken(authKey, token);
  };
}

/**
 * Create a user
 * @param {*} type User type (Particular or Establishment)
 * @param {*} email User Email
 * @param {*} password User Password
 * @param {*} confirmation Confirmation of User Password
 * @param {*} userInfo User Personal Information
 */
export const registerUser = (user) => {
  return (dispatch) => {
    dispatch({ type: types.REGISTER_USER_LOADING });
    return UserAPI.registerUser(user)
      .then((data) => {
        if (data.errors) {
          dispatch({
            type: types.REGISTER_USER_ERROR,
            error: data.errors[0].details,
          });
        } else {
          // AsyncStorage.setItem('authKey', data.auth_token);
          dispatch({
            type: types.REGISTER_USER_SUCCESS,
            error: null,
            guestMessage: data.guest_message,
            // currentUser: data,
            // authKey: data.auth_token,
            isRegistration: true,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.REGISTER_USER_ERROR,
          error: error.message,
        });
      });
  };
};

/**
 * Create a user from FB
 * @param {*} email User Email
 * @param {*} name User name
 * @param {*} firstname User firstname
 * @param {*} User FB token
 * @param {*} Moov FB ID
 */
export const registerUserFB = (
  userEmail,
  userName,
  userFirstName,
  facebookToken,
  facebookID,
  deviceToken,
) => {
  return (dispatch) => {
    dispatch({
      type: types.REGISTER_USER_LOADING,
    });
    return UserAPI.registerUserFB(
      userEmail,
      userName,
      userFirstName,
      facebookToken,
      facebookID,
      deviceToken,
    )
      .then((data) => {
        if (data.error || data.errors) {
          let errorMessage = data.error ? data.error : 'Error';
          errorMessage = data.errors ? data.errors[0].details : 'Error';

          dispatch({
            type: types.REGISTER_USER_ERROR,
            error: errorMessage,
          });
        } else {
          AsyncStorage.setItem('authKey', data.auth_token);
          dispatch({
            type: types.REGISTER_USER_SUCCESS,
            currentUser: data,
            authKey: data.auth_token,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.REGISTER_USER_ERROR,
          currentUser: null,
          authKey: null,
          role: null,
        });
      });
  };
};

/**
 * Create a user from Apple
 * @param {*} userToken User Token
 * @param {*} userIdentity User Identity
 * @param {*} userFirstName User First Name
 * @param {*} userName User Name
 **/
export const registerUserApple = (
  userToken,
  userIdentity,
  userFirstName,
  userName,
  deviceToken,
) => {
  return (dispatch) => {
    dispatch({
      type: types.REGISTER_USER_LOADING,
    });
    return UserAPI.registerUserApple(
      userToken,
      userIdentity,
      userFirstName,
      userName,
      deviceToken,
    )
      .then((data) => {
        if (data.error || data.errors) {
          let errorMessage = data.error ? data.error : 'Error';
          errorMessage = data.errors ? data.errors[0].details : 'Error';

          dispatch({
            type: types.REGISTER_USER_ERROR,
            error: errorMessage,
          });
        } else {
          AsyncStorage.setItem('authKey', data.auth_token);
          dispatch({
            type: types.REGISTER_USER_SUCCESS,
            currentUser: data,
            authKey: data.auth_token,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.REGISTER_USER_ERROR,
          currentUser: null,
          authKey: null,
          role: null,
        });
      });
  };
};

/**
 * Create a user from Google
 * @param {*} userToken User Token
 * @param {*} userIdentity User Identity
 * @param {*} userEmail User Email
 * @param {*} userFirstName User First Name
 * @param {*} userName User Name
 **/
/**
 * Create a user from Google
 * @param {*} userToken User Token
 * @param {*} userIdentity User Identity
 * @param {*} userEmail User Email
 * @param {*} userFirstName User First Name
 * @param {*} userName User Name
 **/
export function registerUserGoogle(
  userToken,
  userIdentity,
  userEmail,
  userFirstName,
  userName,
  deviceToken,
) {
  return function (dispatch) {
    dispatch({
      type: types.REGISTER_USER_LOADING,
    });
    return UserAPI.registerUserGoogle(
      userToken,
      userIdentity,
      userEmail,
      userFirstName,
      userName,
      deviceToken,
    )
      .then((data) => {
        if (data.error || data.errors) {
          let errorMessage = data.error ? data.error : 'Error';
          errorMessage = data.errors ? data.errors[0].details : 'Error';

          dispatch({
            type: types.REGISTER_USER_ERROR,
            error: errorMessage,
          });
        } else {
          AsyncStorage.setItem('authKey', data.auth_token);
          dispatch({
            type: types.REGISTER_USER_SUCCESS,
            currentUser: data,
            authKey: data.auth_token,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.REGISTER_USER_ERROR,
          currentUser: null,
          authKey: null,
        });
      });
  };
}

/**
 * LogOut
 * @param {*} authKey token
 */
export const logout = (authKey, token) => {
  return (dispatch) => {
    dispatch({
      type: types.LOGOUT_USER_LOADING,
    });
    return AuthAPI.logout(authKey, token)
      .then((data) => {
        AsyncStorage.removeItem('authKey');
        AsyncStorage.removeItem('token');
        dispatch({
          type: types.LOGOUT_USER_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({ type: types.LOGOUT_USER_SUCCESS });
      });
  };
};

export const desactivate = (authKey) => {
  return (dispatch) => {
    return UserAPI.desactivateAccount(authKey)
      .then((data) => {
        AsyncStorage.removeItem('authKey');
        AsyncStorage.removeItem('role');
        dispatch({
          type: types.DELETE_USER_SUCCESS,
          authKey: null,
          currentUser: null,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

/**
 * Update Current User
 * @param {*} authKey token
 * @param {*} user User Info
 */
export const updateCurrentUser = (authtoken, user) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_USER_LOADING,
    });
    return UserAPI.updateUser(user)
      .then((data) => {
        if (data.errors) {
          dispatch({
            type: types.UPDATE_USER_ERROR,
            error: data.errors[0].details,
          });
        } else {
          dispatch({
            type: types.UPDATE_USER_SUCCESS,
            currentUser: data,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_USER_ERROR,
        });
        throw error;
      });
  };
};

export const getUser = (authKey) => {
  return (dispatch) => {
    return UserAPI.getCurrentUser()
      .then((data) => {
        if (data.errors) {
          dispatch({
            type: types.GET_USER_ERROR,
            error: data.errors[0].details,
            authKey: null,
          });
        } else {
          dispatch({
            type: types.GET_USER_SUCCESS,
            currentUser: data,
            authKey: authKey,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.GET_USER_ERROR,
          error: 'Erreur',
        });
      });
  };
};

export const forgetPassword = (email) => {
  return (dispatch) => {
    dispatch({ type: types.FORGET_PASSWORD_LOADING });
    return UserAPI.forgetPassword(email)
      .then((data) => {
        if (data.errors) {
          dispatch({
            type: types.FORGET_PASSWORD_ERROR,
            error: data.errors[0].details,
          });
        } else {
          dispatch({
            type: types.FORGET_PASSWORD_SUCCESS,
            success: data.status,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.FORGET_PASSWORD_ERROR,
        });
        throw error;
      });
  };
};

export const updateAvatar = (authKey, payload) => {
  // let photo = { ...payload, uri: payload.uri.replace('file://', '') };
  let photo = payload;
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_USER_AVATAR_LOADING,
    });
    return UserAPI.uploadAvatar(authKey, photo)
      .then((data) => {
        if (data.error) {
          dispatch({
            type: types.UPDATE_USER_AVATAR_ERROR,
            error: data.errors[0].details,
          });
        } else {
          dispatch({
            type: types.UPDATE_USER_AVATAR_SUCCESS,
            currentUser: data,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_USER_AVATAR_ERROR,
          error: "Une erreur s'est produite",
        });
        // throw error;
      });
  };
};

export const changePassword = (
  authKey,
  old_password,
  new_password,
  confirmation,
) => {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_PASSWORD_LOADING,
    });
    return UserAPI.changePassword(
      old_password,
      new_password,
      confirmation,
    )
      .then((data) => {
        if (data.errors) {
          dispatch({
            type: types.CHANGE_PASSWORD_ERROR,
            error: data.errors[0].details,
          });
        } else {
          dispatch({
            type: types.CHANGE_PASSWORD_SUCCESS,
            success: data.status,
            error: null,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.CHANGE_PASSWORD_ERROR,
        });
        throw error;
      });
  };
};

export const setTheme = (theme, option) => {
  return (dispatch) => {
    AsyncStorage.setItem('theme', theme);
    AsyncStorage.setItem('themeDisplayOption', option);
    dispatch({
      type: types.SET_THEME,
      theme: theme,
      option: option,
    });
  };
};

export const getTheme = () => {
  return (dispatch) => {
    return AsyncStorage.multiGet(
      ['theme', 'themeDisplayOption'],
      (errors, keys) => {
        dispatch({
          type: types.GET_THEME,
          theme: keys[0][1],
          option: keys[1][1],
        }),
          (errors) => {
            console.log(errors);
          };
      },
    );
  };
};

export const loginAsGuest = (fcmToken) => {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_AS_GUEST_LOADING });
    return AuthAPI.loginAsGuest(fcmToken)
      .then((data) => {
        if (data.errors) {
          dispatch({
            type: types.LOGIN_AS_GUEST_ERROR,
            error: data.errors[0].details,
          });
        } else {
          if (data.auth_token) {
            AsyncStorage.setItem('authKey', data.auth_token);
            dispatch({
              type: types.LOGIN_AS_GUEST_SUCCESS,
              currentUser: data,
              authKey: data.auth_token,
            });
          } else {
            dispatch({
              type: types.LOGIN_AS_GUEST_ERROR,
              error: data.errors[0].details,
            });
          }
        }
      })
      .catch((error) => {
        dispatch({
          type: types.LOGIN_AS_GUEST_ERROR,
          error: error,
        });
      });
  };
};

export const sendBug = (authKey, payload) => {
  return (dispatch) => {
    dispatch({
      type: types.SEND_BUG_LOADING,
    });
    return UserAPI.sendBug(authKey, payload)
      .then((data) => {
        if (data.error) {
          dispatch({
            type: types.SEND_BUG_ERROR,
            error: data.errors[0].details,
          });
        } else {
          dispatch({
            type: types.SEND_BUG_SUCCESS,
            error: null,
            sendBugMessage: data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.SEND_BUG_ERROR,
          error: "Une erreur s'est produite",
        });
        // throw error;
      });
  };
};

export const createPost = (authKey, payload) => {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_POST_LOADING,
    });
    return UserAPI.createPost(authKey, payload)
      .then((data) => {
        if (data.error) {
          dispatch({
            type: types.CREATE_POST_ERROR,
            error: data.errors[0].details,
          });
        } else {
          dispatch({
            type: types.CREATE_POST_SUCCESS,
            error: null,
            post: data
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: types.CREATE_POST_ERROR,
          error: "Une erreur s'est produite",
        });
        // throw error;
      });
  };
};
