//////////////////CONTROL LEDGER ACTION TYPES/////////////////////////
import {
  CREATE_CONTROL_LEDGER,
  GET_CONTROL_LEDGER,
  UPDATE_CONTROL_LEDGER,
  DELETE_CONTROL_LEDGER,
} from "../actions/types";
//////////////////END OF CONTROL LEDGER ACTION TYPES/////////////////////////

const initialState = [];

function controlLedgerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CONTROL_LEDGER:
      return [...state, payload];

    case GET_CONTROL_LEDGER:
      return payload;

    case UPDATE_CONTROL_LEDGER:
      debugger;
      return state.map((controlLedger) => {
        if (controlLedger.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return controlLedger;
        }
      });

    case DELETE_CONTROL_LEDGER:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default controlLedgerReducer;
