import axios from "axios";

const API_URL = "https://bookigrooms.herokuapp.com/api/admin/reviews";

const allReviews = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/reviews?id=${id}`, config);

  return response.data;
};

const deleteReview = async (reviewInfo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { roomId, reviewId } = reviewInfo;

  const response = await axios.put(
    `${API_URL}?roomId=${roomId}&reviewId=${reviewId}`,
    config
  );

  return response.data;
};

const reviewService = {
  allReviews,
  deleteReview,
};

export default reviewService;
