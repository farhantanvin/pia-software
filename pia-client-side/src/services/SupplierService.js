import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/Suppliers");
};

const get = async (id) => {
  return await http.get("/api/Suppliers/" + id);
};

const create = async (data) => {
  return await http.post("/api/Suppliers", data);
};

const update = async (id, data) => {
  return await http.put("/api/Suppliers/", data);
};

const remove = async (id) => {
  return await http.delete("/api/Suppliers/" + id);
};

const removeAll = async () => {
  return await http.delete("/api/Suppliers");
};

const SupplierService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default SupplierService;
