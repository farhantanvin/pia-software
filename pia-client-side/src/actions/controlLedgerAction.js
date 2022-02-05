import {
  CREATE_CONTROL_LEDGER,
  GET_CONTROL_LEDGER,
  UPDATE_CONTROL_LEDGER,
  DELETE_CONTROL_LEDGER,
} from "./types";

import ControlLedgerService from "../services/ControlLedgerService";

export const createControlLedger =
  (accountTypeId, groupLedgerId, subGroupLedgerId, controlLedgerName) =>
  async (dispatch) => {
    try {
      const res = await ControlLedgerService.create({
        accountTypeId,
        groupLedgerId,
        subGroupLedgerId,
        controlLedgerName,
      });

      dispatch({
        type: CREATE_CONTROL_LEDGER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getControlLedgers = () => async (dispatch) => {
  try {
    const res = await ControlLedgerService.getAll();
    dispatch({
      type: GET_CONTROL_LEDGER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateControlLedger = (id, data) => async (dispatch) => {
  try {
    await ControlLedgerService.update(id, data);

    dispatch({
      type: UPDATE_CONTROL_LEDGER,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteControlLedger = (id) => async (dispatch) => {
  try {
    await ControlLedgerService.remove(id);

    dispatch({
      type: DELETE_CONTROL_LEDGER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
