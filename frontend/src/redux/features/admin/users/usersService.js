import axios from "axios";

const API_URL = "https://bookigrooms.herokuapp.com/api/admin/users";

//All users
const allUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//Get user
const getUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);

  return response.data;
};

//Add new user
const newUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/newUser`, userData, config);

  return response.data;
};

//Update user
const updateUser = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, userData, config);

  return response.data;
};

//Delete users
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

const usersService = { allUsers, getUser, newUser, updateUser, deleteUser };

export default usersService;
