// Global Variables
import { apiUtils } from "../utils/api.js";

const MAIN_URL = "http://localhost:3000/todolists/";

// GET Methods
export const getToDoLists = async () => {
  const results = apiUtils.get(MAIN_URL);
  return results;
};

export const getToDoListByID = async (id) => {
  const results = apiUtils.get(MAIN_URL + `${id}`);
  return results;
};

export const searchToDoLists = async (searchQuery) => {
  const results = apiUtils.get(MAIN_URL + `search/` + `${searchQuery}`);
  return results;
};

export const paginateToDoLists = async (page) => {
  const results = apiUtils.get(MAIN_URL + `paginate/` + `${page}`);
  return results;
};

// POST METHODS
export const addToDoList = async (data) => {
  const results = apiUtils.post(MAIN_URL, data);
  return results;
};

// Delete Methods
export const deleteToDoListByID = async (id) => {
  const results = apiUtils.delete(MAIN_URL + `${id}`);
  return results;
};

// PUT Methods
export const updateToDoListByID = async (id, data) => {
  const results = apiUtils.put(MAIN_URL + `${id}`, data);
  return results;
};
