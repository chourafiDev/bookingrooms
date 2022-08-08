import axios from "axios";

const API_URL = "https://bookigrooms.herokuapp.com/api/client/rooms";

const allRooms = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const filterRooms = async (
  destination,
  category,
  minPrice,
  maxPrice,
  adults,
  children
) => {
  let link = API_URL;

  if (destination) {
    link = link.concat(`?title=${destination}`);
  }

  if (category.length !== 0) {
    link = link.concat(`&category=${category}`);
  }

  if (minPrice && maxPrice) {
    link = link.concat(`&minPrice[gte]=${minPrice}&maxPrice[lte]=${maxPrice}`);
  }

  if (adults) {
    link = link.concat(`&adults=${adults}`);
  }

  if (children) {
    link = link.concat(`&children=${children}`);
  }

  const response = await axios.get(link);

  return response.data;
};

const roomCategories = async () => {
  const response = await axios.get(`${API_URL}/room-categories`);

  return response.data;
};

const similarRooms = async (category) => {
  const response = await axios.get(
    `${API_URL}/similar-rooms?category=${category}`
  );

  return response.data;
};

const roomsByCategory = async () => {
  const response = await axios.get(`${API_URL}/total-rooms-by-category`);

  return response.data;
};

const featuredRooms = async () => {
  const response = await axios.get(`${API_URL}/featured-rooms`);

  return response.data;
};

const getRoom = async (id) => {
  const response = await axios.get(`${API_URL}/find/${id}`);

  return response.data;
};

const getUserRoomsSaved = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/user-rooms-saved`, config);

  return response.data;
};

const roomService = {
  allRooms,
  filterRooms,
  roomCategories,
  roomsByCategory,
  featuredRooms,
  similarRooms,
  getRoom,
  getUserRoomsSaved,
};

export default roomService;
