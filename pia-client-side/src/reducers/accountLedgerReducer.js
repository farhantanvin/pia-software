//////////////////ACCOUNT LEDGER ACTION TYPES/////////////////////////
import {
  CREATE_ACCOUNT_LEDGER,
  GET_ACCOUNT_LEDGER,
  UPDATE_ACCOUNT_LEDGER,
  DELETE_ACCOUNT_LEDGER,
} from "../actions/types";
//////////////////END OF ACCOUNT LEDGER ACTION TYPES/////////////////////////

const initialState = [];

function accountLedgerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ACCOUNT_LEDGER:
      return [...state, payload];

    case GET_ACCOUNT_LEDGER:
      return payload;

    case UPDATE_ACCOUNT_LEDGER:
      return state.map((accountLedger) => {
        if (accountLedger.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return accountLedger;
        }
      });

    case DELETE_ACCOUNT_LEDGER:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default accountLedgerReducer;
