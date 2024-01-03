import axios from 'axios';
const baseUrl = '/api';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/blogs`).catch((e) => {
    console.log(e.message);
    throw e;
  });
  return response.data;
};

const createBlog = async (data, headers) => {
  const response = await axios
    .post(`${baseUrl}/blogs`, data, { headers: headers })
    .catch((e) => {
      console.log(e.message);
      throw e;
    });
  return response.data;
};

const updateBlog = async (id, data, headers) => {
  const response = await axios
    .put(`${baseUrl}/blogs/${id}`, data, { headers: headers })
    .catch((e) => {
      console.log(e.message);
      throw e;
    });
  return response.data;
};

const deleteBlog = async (id, headers) => {
  const response = await axios
    .delete(`${baseUrl}/blogs/${id}`, { headers: headers })
    .catch((e) => {
      console.log(e.message);
      throw e;
    });
  return response.data;
};

export default { getAll, createBlog, updateBlog, deleteBlog };
