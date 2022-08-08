import axios from "axios";

const API_URL = "https://bookigrooms.herokuapp.com/api/auth";
const API_URL_ROOM = "https://bookigrooms.herokuapp.com/api/client/rooms";

//Regsiter user
const regsiter = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data.userData) {
    localStorage.setItem("user", JSON.stringify(response.data.userData));
  }

  return response.data;
};

//Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data.userData) {
    localStorage.setItem("user", JSON.stringify(response.data.userData));
  }

  return response.data;
};

//Logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const favoriteRoom = async (roomId, token) => {
  const response = axios({
    method: "put",
    url: `${API_URL_ROOM}/save/${roomId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

  return response;
};

const unFavoriteRoom = async (roomId, token) => {
  const response = axios({
    method: "put",
    url: `${API_URL_ROOM}/unsave/${roomId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

  return response;
};

const authService = {
  regsiter,
  login,
  logout,
  getUser,
  favoriteRoom,
  unFavoriteRoom,
};

export default authService;
