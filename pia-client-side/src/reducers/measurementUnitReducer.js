//////////////////MEASUREMENT UNIT ACTION TYPES/////////////////////////
import {
  CREATE_MEASUREMENT_UNIT,
  GET_MEASUREMENT_UNIT,
  UPDATE_MEASUREMENT_UNIT,
  DELETE_MEASUREMENT_UNIT,
} from "../actions/types";
//////////////////END OF MEASUREMENT UNIT ACTION TYPES/////////////////////////

const initialState = [];

function measurementUnitReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MEASUREMENT_UNIT:
      return [...state, payload];

    case GET_MEASUREMENT_UNIT:
      return payload;

    case UPDATE_MEASUREMENT_UNIT:
      return state.map((measurementUnit) => {
        if (measurementUnit.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return measurementUnit;
        }
      });

    case DELETE_MEASUREMENT_UNIT:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default measurementUnitReducer;
