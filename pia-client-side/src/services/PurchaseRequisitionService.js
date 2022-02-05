import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/PurchaseRequisitions");
};

const get = async (id) => {
  return await http.get(`/api/PurchaseRequisitions/${id}`);
};

const create = async (xData) => {
  return await http.post("/api/PurchaseRequisitions", xData);
};

const update = async (id, data) => {
  return await http.put("/api/PurchaseRequisitions/", data);
};

const remove = async (id) => {
  return await http.delete("/api/PurchaseRequisitions/" + id);
};

const removeAll = async () => {
  return await http.delete(`/api/PurchaseRequisitions`);
};

const PurchaseRequisitionService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default PurchaseRequisitionService;
