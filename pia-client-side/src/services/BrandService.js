import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/Brands");
};

const get = async (id) => {
  return await http.get("/api/Brands/" + id);
};

const create = async (data) => {
  return await http.post("/api/Brands", data);
};

const update = async (id, data) => {
  return await http.put("/api/Brands/", data);
};

const remove = async (id) => {
  return await http.delete("/api/Brands/" + id);
};

const removeAll = async () => {
  return await http.delete("/api/Brands");
};

const BrandService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default BrandService;
