//////////////////WORKING HOUR ACTION TYPES/////////////////////////
import {
    CREATE_DEGREE,
    GET_DEGREE,
    UPDATE_DEGREE,
    DELETE_DEGREE,
} from "../actions/types";
//////////////////END OF WORKING HOUR ACTION TYPES/////////////////////////

const initialState = [];


function degreeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {


        case CREATE_DEGREE:
            return [...state, payload];


        case GET_DEGREE:
            debugger;
            console.log("Reducer", payload)
            return payload;


        case UPDATE_DEGREE:
            debugger;
            return state.map((degree) => {
                if (degree.id === payload.id) {
                    return {
                        ...state,
                        ...payload,
                    };
                } else {
                    return degree;
                }
            });

        case DELETE_DEGREE:
            return state.filter(({ id }) => id !== payload.id);

        default:
            return state;
    }
};






export default degreeReducer;