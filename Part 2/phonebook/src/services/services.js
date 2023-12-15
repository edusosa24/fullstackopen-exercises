import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getPersons = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const postPerson = (person) => {
  return axios.post(baseURL, person).then((response) => response.data);
};

export default {
  getPersons,
  postPerson,
};
