//////////////////SUB GROUP LEDGER ACTION TYPES/////////////////////////
import {
  CREATE_SUB_GROUP_LEDGER,
  GET_SUB_GROUP_LEDGER,
  UPDATE_SUB_GROUP_LEDGER,
  DELETE_SUB_GROUP_LEDGER,
  CATEGORY_SELECT_SUB_GROUP_LEDGER,
} from "../actions/types";
//////////////////END OF SUB GROUP LEDGER ACTION TYPES/////////////////////////

const initialState = [];

function subGroupLedgerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SUB_GROUP_LEDGER:
      return [...state, payload];

    case GET_SUB_GROUP_LEDGER:
      return payload;

    case UPDATE_SUB_GROUP_LEDGER:
      return state.map((subGroupLedger) => {
        if (subGroupLedger.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return subGroupLedger;
        }
      });

    case DELETE_SUB_GROUP_LEDGER:
      return state.filter(({ id }) => id !== payload.id);

    case CATEGORY_SELECT_SUB_GROUP_LEDGER:
      return payload;

    default:
      return state;
  }
}

export default subGroupLedgerReducer;
