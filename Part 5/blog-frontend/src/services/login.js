import axios from 'axios';
const baseUrl = '/api';

const login = async (loginInfo) => {
  const response = await axios
    .post(`${baseUrl}/login`, loginInfo)
    .catch((e) => {
      console.log(e.message);
      throw e;
    });
  return response.data;
};

export default { login };
