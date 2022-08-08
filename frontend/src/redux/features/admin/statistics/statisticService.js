import axios from "axios";

const API_URL = "https://bookigrooms.herokuapp.com/api/admin";

const getStatistic = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/statistics`, config);

  return response.data;
};

const reviewService = {
  getStatistic,
};

export default reviewService;
