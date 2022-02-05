//////////////////DEPARTMENT TYPE ACTION TYPES/////////////////////////
import {
  CREATE_DEPARTMENT_TYPE,
  GET_DEPARTMENT_TYPE,
  UPDATE_DEPARTMENT_TYPE,
  DELETE_DEPARTMENT_TYPE,
} from "../actions/types";
//////////////////END OF DEPARTMENT TYPE ACTION TYPES/////////////////////////

const initialState = [];

function departmentTypeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_DEPARTMENT_TYPE:
      return [...state, payload];

    case GET_DEPARTMENT_TYPE:
      return payload;

    case UPDATE_DEPARTMENT_TYPE:
      return state.map((departmentType) => {
        if (departmentType.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return departmentType;
        }
      });

    case DELETE_DEPARTMENT_TYPE:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default departmentTypeReducer;
