import {
  CREATE_CONDITION,
  GET_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
} from "./types";

import ConditionService from "../services/ConditionService";

export const createCondition = (conditionDetail) => async (dispatch) => {
  try {
    const res = await ConditionService.create({ conditionDetail });
    console.log("resp", res);

    dispatch({
      type: CREATE_CONDITION,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getConditions = () => async (dispatch) => {
  try {
    const res = await ConditionService.getAll();

    dispatch({
      type: GET_CONDITION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCondition = (id, data) => async (dispatch) => {
  try {
    await ConditionService.update(id, data);

    dispatch({
      type: UPDATE_CONDITION,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCondition = (id) => async (dispatch) => {
  try {
    await ConditionService.remove(id);

    dispatch({
      type: DELETE_CONDITION,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
