import http from "../utilities/http-common";

const getAll = async () => {
  return await http.get("/api/ControlLedgers");
};

const get = async (id) => {
  return await http.get("/api/ControlLedgers/" + id);
};

const create = async (data) => {
  return await http.post("/api/ControlLedgers", data);
};

const update = async (id, data) => {
  return await http.put("/api/ControlLedgers/", data);
};

const remove = async (id) => {
  return await http.delete("/api/ControlLedgers/" + id);
};

const removeAll = async () => {
  return await http.delete("/api/ControlLedgers");
};

const ControlLedgerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default ControlLedgerService;
