import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticService from "./statisticService";

const initialState = {
  statistics: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//All reviews
export const getStatistics = createAsyncThunk(
  "statistic/getStatistics",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await statisticService.getStatistic(token);
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

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    reset: (state) => {
      state.statistics = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // All reviews
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.statistics = action.payload.data;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = statisticSlice.actions;
export default statisticSlice.reducer;
