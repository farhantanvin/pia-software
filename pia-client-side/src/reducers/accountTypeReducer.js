//////////////////ACCOUNT TYPE ACTION TYPES/////////////////////////
import {
  CREATE_ACCOUNT_TYPE,
  GET_ACCOUNT_TYPE,
  UPDATE_ACCOUNT_TYPE,
  DELETE_ACCOUNT_TYPE,
} from "../actions/types";
//////////////////END OF ACCOUNT TYPE ACTION TYPES/////////////////////////

const initialState = [];

function accountTypeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ACCOUNT_TYPE:
      return [...state, payload];

    case GET_ACCOUNT_TYPE:
      return payload;

    case UPDATE_ACCOUNT_TYPE:
      return state.map((accountType) => {
        if (accountType.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return accountType;
        }
      });

    case DELETE_ACCOUNT_TYPE:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default accountTypeReducer;
