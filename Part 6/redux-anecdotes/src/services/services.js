import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postOne = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const putOne = async (data) => {
  const id = data.id;
  const response = await axios.put(`${baseUrl}/${id}`, data, { new: true });
  return response.data;
};

export default { getAll, postOne, putOne };
