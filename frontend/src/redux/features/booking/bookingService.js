import axios from "axios";

const API_URL = "https://bookigrooms.herokuapp.com/api/client/bookings";

//Get bookings
const getBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/me`, config);

  return response.data;
};

//Get booking
const getBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);

  return response.data;
};

//Create booking
const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/`, bookingData, config);

  return response.data;
};

//Booking availability
const bookingAvailability = async (roomId, checkInDate, checkOutDate) => {
  let query = `?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

  const response = await axios.get(
    `${API_URL}/check-booking-availability${query}`
  );

  return response.data;
};

//Get all booked dates
const allBookedDates = async (roomId) => {
  const response = await axios.get(`${API_URL}/booked-dates?roomId=${roomId}`);

  return response.data;
};

const bookingService = {
  createBooking,
  bookingAvailability,
  allBookedDates,
  getBookings,
  getBooking,
};

export default bookingService;
