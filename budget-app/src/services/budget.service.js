import http from "../http-common";

class BudgetDataService {
  getAll() {
    return http.get("/budget");
  }

  get(id) {
    return http.get(`/budget/${id}`);
  }

  create(data) {
    return http.post("/budget", data);
  }

  update(id, data) {
    return http.put(`/budget/${id}`, data);
  }

  delete(id) {
    return http.delete(`/budget/${id}`);
  }

  deleteAll() {
    return http.delete(`/budget`);
  }

  findByTitle(title) {
    return http.get(`/budget?title=${title}`);
  }
}

export default new BudgetDataService();