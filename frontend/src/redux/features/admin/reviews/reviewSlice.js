import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
  reviews: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  messageSuccess: "",
  message: "",
};

//All reviews
export const getReviews = createAsyncThunk(
  "adminReview/allReviews",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.allReviews(id, token);
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

//delete review
export const deleteReview = createAsyncThunk(
  "adminReview/deleteReview",
  async (reviewInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await reviewService.deleteReview(reviewInfo, token);
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

const reviewSlice = createSlice({
  name: "adminReview",
  initialState,
  reducers: {
    reset: (state) => {
      state.reviews = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.messageSuccess = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // All reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Delete review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdded = true;
        state.messageSuccess = action.payload.message;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reviewSlice.actions;
export default reviewSlice.reducer;
