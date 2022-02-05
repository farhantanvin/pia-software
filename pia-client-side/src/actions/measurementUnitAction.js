import {
  CREATE_MEASUREMENT_UNIT,
  GET_MEASUREMENT_UNIT,
  UPDATE_MEASUREMENT_UNIT,
  DELETE_MEASUREMENT_UNIT,
} from "./types";

import MeasurementUnitService from "../services/MeasurementUnitService";

export const createMeasurementUnit =
  (measurementUnitName) => async (dispatch) => {
    try {
      const res = await MeasurementUnitService.create({ measurementUnitName });
      console.log("resp", res);

      dispatch({
        type: CREATE_MEASUREMENT_UNIT,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getMeasurementUnits = () => async (dispatch) => {
  try {
    const res = await MeasurementUnitService.getAll();
    dispatch({
      type: GET_MEASUREMENT_UNIT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateMeasurementUnit = (id, data) => async (dispatch) => {
  try {
    await MeasurementUnitService.update(id, data);

    dispatch({
      type: UPDATE_MEASUREMENT_UNIT,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteMeasurementUnit = (id) => async (dispatch) => {
  try {
    await MeasurementUnitService.remove(id);

    dispatch({
      type: DELETE_MEASUREMENT_UNIT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
