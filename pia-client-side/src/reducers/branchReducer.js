//////////////////BRANCH ACTION TYPES/////////////////////////
import {
  CREATE_BRANCH,
  GET_BRANCH,
  UPDATE_BRANCH,
  DELETE_BRANCH,
} from "../actions/types";
//////////////////END OF BRANCH ACTION TYPES/////////////////////////

const initialState = [];

function branchReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BRANCH:
      return [...state, payload];

    case GET_BRANCH:
      return payload;

    case UPDATE_BRANCH:
      return state.map((branch) => {
        if (branch.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return branch;
        }
      });

    case DELETE_BRANCH:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default branchReducer;
