import {
  CREATE_PURCHASE_REQUISITION,
  GET_PURCHASE_REQUISITION,
  UPDATE_PURCHASE_REQUISITION,
  DELETE_PURCHASE_REQUISITION,
} from "./types";

import PurchaseRequisitionService from "../services/PurchaseRequisitionService";

export const createPurchaseRequisition = (xData) => async (dispatch) => {
  try {
    const res = await PurchaseRequisitionService.create(xData);
    dispatch({
      type: CREATE_PURCHASE_REQUISITION,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPurchaseRequisitions = () => async (dispatch) => {
  try {
    const res = await PurchaseRequisitionService.getAll();
    dispatch({
      type: GET_PURCHASE_REQUISITION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePurchaseRequisition = (id, data) => async (dispatch) => {
  try {
    await PurchaseRequisitionService.update(id, data);

    dispatch({
      type: UPDATE_PURCHASE_REQUISITION,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePurchaseRequisition = (id) => async (dispatch) => {
  try {
    await PurchaseRequisitionService.remove(id);

    dispatch({
      type: DELETE_PURCHASE_REQUISITION,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
