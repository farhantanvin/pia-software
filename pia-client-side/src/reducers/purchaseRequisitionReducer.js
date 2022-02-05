//////////////////PURCHASE REQUISITION ACTION TYPES/////////////////////////
import {
  CREATE_PURCHASE_REQUISITION,
  GET_PURCHASE_REQUISITION,
  UPDATE_PURCHASE_REQUISITION,
  DELETE_PURCHASE_REQUISITION,
} from "../actions/types";
//////////////////END OF PURCHASE REQUISITION ACTION TYPES/////////////////////////

Purchase_Requisition;

const initialState = [];

function purchaseRequisitionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PURCHASE_REQUISITION:
      return [...state, payload];

    case GET_PURCHASE_REQUISITION:
      return payload;

    case UPDATE_PURCHASE_REQUISITION:
      return state.map((purchaseRequisition) => {
        if (purchaseRequisition.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return purchaseRequisition;
        }
      });

    case DELETE_PURCHASE_REQUISITION:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default purchaseRequisitionReducer;
