import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/Conditions");
};

const get = async (id) => {
  return await http.get(`/api/Conditions/${id}`);
};

const create = async (data) => {
  return await http.post("/api/Conditions", data);
};

const update = async (id, data) => {
  return await http.put("/api/Conditions/", data);
};

const remove = async (id) => {
  return await http.delete("/api/Conditions/" + id);
};

const removeAll = async () => {
  return await http.delete(`/api/Conditions`);
};

const ConditionService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default ConditionService;
