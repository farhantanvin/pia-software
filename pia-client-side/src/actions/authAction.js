//////////////////////This is import for API Call/////////////
import AuthService from "../services/AuthService";
////////////////////End of API CALL/////////////////////////

//////////////////SIGNIN ACTION TYPES/////////////////////////
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";

export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_ERROR = "RESET_PASSWORD_ERROR";

export const DEAUTHENTICATE_USER = "DEAUTHENTICATE_USER";
export const DEAUTHENTICATE_USER_SUCCESS = "DEAUTHENTICATE_USER_SUCCESS";
export const DEAUTHENTICATE_USER_ERROR = "DEAUTHENTICATE_USER_ERROR";
//////////////////END OF SIGNIN ACTION TYPES/////////////////////////

export const LogInAuth = (email, password) => async (dispatch) => {
  try {
    const res = await AuthService.create({ email, password });

    dispatch({
      type: LOGIN,
      payload: res.data,
    });

    debugger;
    return Promise.resolve(res.data);
    

  } catch (err) {
    return Promise.reject(err);
  }
};



// export const LogInAuth = (userData) => async (dispatch) => {
//   try {
//     const res = await AuthService.create({ userData });

//     dispatch({
//       type: LOGIN,
//       payload: res.data,
//     });

//     return Promise.resolve(res.data);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };




