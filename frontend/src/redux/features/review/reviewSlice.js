import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isReviewAvailable: null,
  messageSuccess: "",
  message: "",
};

//Create review
export const createReview = createAsyncThunk(
  "review/createReview",
  async (reviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.createReview(reviewData, token);
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

//check Is review available
export const checkIsReviewAvailable = createAsyncThunk(
  "review/isReviewAvailable",
  async (roomId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.isReviewAvailable(roomId, token);
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
  name: "review",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isReviewAvailable = null;
      state.messageSuccess = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //Create review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messageSuccess = action.payload.message;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //check Is review available
      .addCase(checkIsReviewAvailable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkIsReviewAvailable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReviewAvailable = action.payload;
      })
      .addCase(checkIsReviewAvailable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reviewSlice.actions;
export default reviewSlice.reducer;
