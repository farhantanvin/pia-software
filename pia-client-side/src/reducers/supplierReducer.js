//////////////////SUPPLIER ACTION TYPES/////////////////////////
import {
  CREATE_SUPPLIER,
  GET_SUPPLIER,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
} from "../actions/types";
//////////////////END OF SUPPLIER ACTION TYPES/////////////////////////

const initialState = [];

function supplierReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SUPPLIER:
      return [...state, payload];

    case GET_SUPPLIER:
      debugger;
      console.log("Reducer", payload);
      return payload;

    case UPDATE_SUPPLIER:
      debugger;
      return state.map((supplier) => {
        if (supplier.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return supplier;
        }
      });

    case DELETE_SUPPLIER:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default supplierReducer;
