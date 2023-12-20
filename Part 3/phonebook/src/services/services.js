import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const getPersons = () => {
  return axios.get(`${baseURL}/persons`).then((response) => response.data);
};

const postPerson = (person) => {
  return axios
    .post(`${baseURL}/persons`, person)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  axios.delete(`${baseURL}/persons/${id}`);
};

const putPerson = (person) => {
  return axios
    .put(`${baseURL}/persons/${person.id}`, { number: person.number })
    .then((response) => response.data);
};

export default {
  getPersons,
  postPerson,
  deletePerson,
  putPerson,
};
