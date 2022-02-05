import {
  CREATE_DEGREE,
  GET_DEGREE,
  UPDATE_DEGREE,
  DELETE_DEGREE,
} from "./types";

import DegreeService from "../services/DegreeService";

export const createDegree = (degreeName) => async (dispatch) => {
  try {
    const res = await DegreeService.create({ degreeName });

    dispatch({
      type: CREATE_DEGREE,
      payload: res.data.data,
    });

    return Promise.resolve(res.data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getDegrees = () => async (dispatch) => {
  try {
    const res = await DegreeService.getAll();
    console.log("action", res);
    dispatch({
      type: GET_DEGREE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateDegree = (id, data) => async (dispatch) => {
  try {
    //const res = await DepartmentTypeService.update(id, data);

    await DegreeService.update(id, data);

    dispatch({
      type: UPDATE_DEGREE,
      payload: data.data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDegree = (id) => async (dispatch) => {
  try {
    await DegreeService.remove(id);

    dispatch({
      type: DELETE_DEGREE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
