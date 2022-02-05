//////////////////BRAND ACTION TYPES/////////////////////////
import {
  CREATE_BRAND,
  GET_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
} from "../actions/types";
//////////////////END OF BRAND ACTION TYPES/////////////////////////

const initialState = [];

function brandReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BRAND:
      return [...state, payload];

    case GET_BRAND:
      return payload;

    case UPDATE_BRAND:
      return state.map((brand) => {
        if (brand.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return brand;
        }
      });

    case DELETE_BRAND:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default brandReducer;
