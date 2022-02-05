//////////////////GROUP LEDGER ACTION TYPES/////////////////////////
import {
  CREATE_GROUP_LEDGER,
  GET_GROUP_LEDGER,
  UPDATE_GROUP_LEDGER,
  DELETE_GROUP_LEDGER,
  CATEGORY_SELECT_GROUP_LEDGER,
} from "../actions/types";
//////////////////END OF GROUP LEDGER ACTION TYPES/////////////////////////

const initialState = [];

function groupLedgerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_GROUP_LEDGER:
      return [...state, payload];

    case GET_GROUP_LEDGER:
      return payload;

    case UPDATE_GROUP_LEDGER:
      return state.map((groupLedger) => {
        if (groupLedger.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return groupLedger;
        }
      });

    case DELETE_GROUP_LEDGER:
      return state.filter(({ id }) => id !== payload.id);

    case CATEGORY_SELECT_GROUP_LEDGER:
      return payload;

    default:
      return state;
  }
}

export default groupLedgerReducer;
