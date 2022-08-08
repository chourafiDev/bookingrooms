import axios from "axios";

const API_URL = "https://bookigrooms.herokuapp.com/api/admin/rooms";

const allRooms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}`, config);

  return response.data;
};

const getRoom = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);

  return response.data;
};

const addRoom = async (roomData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, roomData, config);

  return response.data;
};

const updateRoom = async (id, roomData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, roomData, config);

  return response.data;
};

const deleteRoom = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

const roomService = {
  allRooms,
  addRoom,
  getRoom,
  updateRoom,
  deleteRoom,
};

export default roomService;
