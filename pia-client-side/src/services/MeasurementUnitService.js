import http from "../utilities/http-common";

const getAll = async () => {
  return await http.get("/api/MeasurementUnits");
};

const get = async (id) => {
  return await http.get(`/api/MeasurementUnits/${id}`);
};

const create = async (data) => {
  return await http.post("/api/MeasurementUnits", data);
};

const update = async (id, data) => {
  return await http.put("/api/MeasurementUnits/", data);
};

const remove = async (id) => {
  return await http.delete("/api/MeasurementUnits/" + id);
};

const removeAll = async () => {
  return await http.delete(`/api/MeasurementUnits`);
};

const MeasurementUnitService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default MeasurementUnitService;
