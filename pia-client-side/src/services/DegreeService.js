import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/WorkingPlace");
};

const get = async (id) => {
  return await http.get(`/api/WorkingPlace/${id}`);
};

const create = async (data) => {
  return await http.post("/api/WorkingPlace", data);
};

const update = async (id, data) => {
  return await http.put("/api/WorkingPlace/" + id, data);
};

const remove = async (id) => {
  return await http.delete("/api/WorkingPlace/" + id);
};

const removeAll = async () => {
  return await http.delete(`/WorkingPlace`);
};

const DegreeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default DegreeService;
