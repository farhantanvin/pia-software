//////////////////CONDITION ACTION TYPES/////////////////////////
import {
  CREATE_CONDITION,
  GET_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
} from "../actions/types";
//////////////////END OF CONDITION ACTION TYPES/////////////////////////

const initialState = [];

function conditionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CONDITION:
      return [...state, payload];

    case GET_CONDITION:
      return payload;

    case UPDATE_CONDITION:
      return state.map((condition) => {
        if (condition.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return condition;
        }
      });

    case DELETE_CONDITION:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default conditionReducer;
