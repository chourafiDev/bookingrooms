import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
  bookings: [],
  booking: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  bookingAvailable: null,
  bookedDates: [],
  messageSuccess: "",
  message: "",
};

//Get bookings
export const getBookings = createAsyncThunk(
  "booking/getBookings",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getBookings(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get booking
export const getBooking = createAsyncThunk(
  "booking/getBooking",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getBooking(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.createBooking(bookingData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Check booking availability
export const checkBookingAvailability = createAsyncThunk(
  "booking/checkBookingAvailability",
  async (bookingInfo, thunkAPI) => {
    try {
      const { roomId, checkInDate, checkOutDate } = bookingInfo;

      return await bookingService.bookingAvailability(
        roomId,
        checkInDate,
        checkOutDate
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get all booked dates
export const getAllBookedDates = createAsyncThunk(
  "booking/getAllBookedDates",
  async (roomId, thunkAPI) => {
    try {
      return await bookingService.allBookedDates(roomId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.booking = {};
      state.bookings = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.bookingAvailable = null;
      state.bookedDates = [];
      state.messageSuccess = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //Get bookings
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Get booking
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(getBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Create booking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messageSuccess = action.payload.message;
        state.booking = action.payload.booking;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Check booking availability
      .addCase(checkBookingAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkBookingAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookingAvailable = action.payload;
      })
      .addCase(checkBookingAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Get all booked dates
      .addCase(getAllBookedDates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookedDates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookedDates = action.payload;
      })
      .addCase(getAllBookedDates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
