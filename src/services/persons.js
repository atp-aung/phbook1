import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const delPerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const crud = { getAll, create, update, delPerson };

export default crud;
