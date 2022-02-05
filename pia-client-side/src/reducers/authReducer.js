import {
  LOGIN,
  // LOGIN_ERROR,
  // LOGIN_SUCCESS,
  // LOGOUT,
  // LOGOUT_SUCCESS,
  // LOGOUT_ERROR,
  // REGISTRATION,
  // REGISTRATION_SUCCESS,
  // REGISTRATION_ERROR,
  // RESET_PASSWORD,
  // RESET_PASSWORD_SUCCESS,
  // RESET_PASSWORD_ERROR,
  // AUTHENTICATE_USER,
  // AUTHENTICATE_USER_SUCCESS,
  // AUTHENTICATE_USER_ERROR,
  // DEAUTHENTICATE_USER,
  // DEAUTHENTICATE_USER_SUCCESS,
  // DEAUTHENTICATE_USER_ERROR,
} from "../actions/authAction";


const initialState = [];

function authReducer(logins = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return [...logins, payload];

    // case RETRIEVE_TUTORIALS:
    //   return payload;

    // case UPDATE_TUTORIAL:
    //   return tutorials.map((tutorial) => {
    //     if (tutorial.id === payload.id) {
    //       return {
    //         ...tutorial,
    //         ...payload,
    //       };
    //     } else {
    //       return tutorial;
    //     }
    //   });

    // case DELETE_TUTORIAL:
    //   return tutorials.filter(({ id }) => id !== payload.id);

    // case DELETE_ALL_TUTORIALS:
    //   return [];

    default:
      return logins;
  }
};

export default authReducer;