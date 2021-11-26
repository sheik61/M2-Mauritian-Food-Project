import * as types from '../../constants';

const initialState = {
  currentUser: null,
  token: null,
  authenticatingUser: false,
  isLoggingOut: false,
  isLoadingUser: false,
  isLoadingKey: false,
  isLoadingSecondaryCategory: false,
  isUpdatingUser: false,
  isForgetPasswordLoading: false,
  isChangePassword: false,
  loggedInAsGuest: false,
  authKey: null,
  error: null,
  reGeterror: null,
  forgetPasswordMessage: null,
  isLoadingUploadAvatar: false,
  isLoadingDeletePhotoEstablishment: false,
  success: null,
  isLoadingMostRecentPosts: false,
  isUpdatingLocation: false,
  isUpdatingHasMigrated: false,
  isSendingBug: false,
  sendBugMessage: null,
  guestMessage: false,
  isCreatingPost: false,
  post: null,
  spot_count: 0
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_FIREBASE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case types.SET_THEME:
      return {
        ...state,
        theme: action.theme,
        option: action.option,
      };
    case types.GET_THEME:
      return {
        ...state,
        theme: action.theme,
        option: action.option,
      };
    case types.RESET_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isRegistration: false,
        guestMessage: false,
        authKey: null,
        role: null,
        searchRecent: [],
        searchRecentActuality: [],
        error: null,
      };
    case types.AUTHENTICATE_USER_LOADING:
      return {
        ...state,
        error: null,
        authenticatingUser: true,
      };
    case types.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        authenticatingUser: false,
        currentUser: action.currentUser,
        spot_count: action.currentUser && action.currentUser?.spot_count,
        authKey: action.authKey,
        loggedInAsGuest: false,
        isRegistration: false,
        guestMessage: false,
      };
    case types.AUTHENTICATE_USER_ERROR:
      return {
        ...state,
        authenticatingUser: false,
        authKey: null,
        currentUser: null,
        error: action.error,
      };
    case types.LOGIN_AS_GUEST_LOADING:
      return {
        ...state,
        error: null,
        authenticatingUser: true,
      };
    case types.LOGIN_AS_GUEST_SUCCESS:
      return {
        ...state,
        error: null,
        authenticatingUser: false,
        currentUser: action.currentUser,
        spot_count: action.currentUser && action.currentUser?.spot_count,
        authKey: action.authKey,
        loggedInAsGuest: true,
      };
    case types.LOGIN_AS_GUEST_ERROR:
      return {
        ...state,
        authenticatingUser: false,
        authKey: null,
        currentUser: null,
        error: action.error,
      };

    case types.REGISTER_USER_LOADING:
      return {
        ...state,
        isLoadingUser: true,
      };
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoadingUser: false,
        currentUser: action.currentUser,
        authKey: action.authKey,
        role: action.role,
        error: null,
        isRegistration: action.isRegistration,
        loggedInAsGuest: false,
        guestMessage: action.guestMessage,
      };
    case types.REGISTER_USER_ERROR:
      return {
        ...state,
        isLoadingUser: false,
        currentUser: null,
        authKey: null,
        role: null,
        error: action.error,
      };
    case types.LOGOUT_USER_LOADING:
      return {
        ...state,
        isLoggingOut: true,
      };
    case types.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        currentUser: null,
        token: null,
        authKey: null,
        error: null,
      };
    case types.UPDATE_USER_LOADING:
      return {
        ...state,
        isUpdatingUser: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
        currentUser: action.currentUser,
        error: null,
      };
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        isUpdatingUser: false,
        error: action.error,
      };
    case types.FORGET_PASSWORD_LOADING:
      return {
        ...state,
        isForgetPasswordLoading: true,
      };
    case types.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isForgetPasswordLoading: false,
        success: action.success,
        error: null,
      };
    case types.FORGET_PASSWORD_ERROR:
      return {
        ...state,
        isForgetPasswordLoading: false,
        success: null,
        error: action.error,
      };
    case types.CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        isChangePassword: true,
      };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangePassword: false,
        success: action.success,
        error: null,
      };
    case types.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        isChangePassword: false,
        success: null,
        error: action.error,
      };
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        isLoadingUser: false,
        currentUser: action.currentUser,
        authKey: action.authKey,
        error: null,
      };
    case types.GET_USER_ERROR:
      return {
        ...state,
        isLoadingUser: false,
        currentUser: null,
        error: action.error,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        authKey: null,
        role: null,
        error: null,
      };
    case types.GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        listCategory: action.listCategory,
      };
    case types.GET_USER_KEY_LOADING:
      return {
        ...state,
        isLoadingKey: true,
      };
    case types.GET_USER_KEY_SUCCESS:
      return {
        ...state,
        isLoadingKey: false,
        authKey: action.authKey,
        role: action.role,
        token: action.token,
        currentUser: action.currentUser,
        reGeterror: null,
      };
    case types.GET_USER_KEY_ERROR:
      return {
        ...state,
        isLoadingKey: false,
        authKey: null,
        token: null,
        currentUser: null,
        reGeterror: action.error,
      };
    case types.UPDATE_USER_AVATAR_LOADING:
      return {
        ...state,
        isLoadingUploadAvatar: true,
      };
    case types.UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        isLoadingUploadAvatar: false,
        currentUser: action.currentUser,
      };
    case types.UPDATE_USER_AVATAR_ERROR:
      return {
        ...state,
        isLoadingUploadAvatar: false,
        error: action.error,
      };
    case types.UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        isUpdatingLocation: false,
        error: null,
      };
    case types.UPDATE_LOCATION_LOADING:
      return {
        ...state,
        isUpdatingLocation: true,
      };
    case types.UPDATE_LOCATION_ERROR:
      return {
        ...state,
        error: action.error,
        isUpdatingLocation: false,
      };
    case types.SEND_BUG_SUCCESS:
      return {
        ...state,
        isSendingBug: false,
        sendBugMessage: action.sendBugMessage,
        error: null,
      };
    case types.SEND_BUG_LOADING:
      return {
        ...state,
        isSendingBug: true,
      };
    case types.SEND_BUG_ERROR:
      return {
        ...state,
        error: action.error,
        isSendingBug: false,
      };
    case types.CREATE_POST_LOADING:
      return {
        ...state,
        isCreatingPost: true,
        post: null,
        error: null,
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        isCreatingPost: false,
        post: action.post,
        error: null,
      };
    case types.CREATE_POST_ERROR:
      return {
        ...state,
        error: action.error,
        post: null,
        isCreatingPost: false,
      };
    case types.UPDATE_SPOT_COUNT:
      return {
        ...state,
        spot_count: state.spot_count + 1
      }
    default:
      return state;
  }
}
