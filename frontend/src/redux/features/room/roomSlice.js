import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roomService from "./roomService";

const initialState = {
  rooms: [],
  filterRooms: [],
  roomsByCategory: [],
  roomCategories: [],
  featuredRooms: [],
  similarRooms: [],
  userRoomsSaved: [],
  room: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  messageSuccess: "",
  message: "",
};

//All rooms
export const getRooms = createAsyncThunk(
  "room/allRooms",
  async (_, thunkAPI) => {
    try {
      return await roomService.allRooms();
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

//Filter rooms
export const getFilterRooms = createAsyncThunk(
  "room/filterRooms",
  async (filterData = {}, thunkAPI) => {
    try {
      const { destination, category, minPrice, maxPrice, adults, children } =
        filterData;

      return await roomService.filterRooms(
        destination,
        category,
        minPrice,
        maxPrice,
        adults,
        children
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

//Get rooms by category
export const getRoomsByCategory = createAsyncThunk(
  "room/roomsByCategory",
  async (_, thunkAPI) => {
    try {
      return await roomService.roomsByCategory();
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

//Get rooms categories
export const getRoomCategories = createAsyncThunk(
  "room/roomCategories",
  async (_, thunkAPI) => {
    try {
      return await roomService.roomCategories();
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

//Get Similar rooms
export const getSimilarRooms = createAsyncThunk(
  "room/similarRooms",
  async (category, thunkAPI) => {
    try {
      return await roomService.similarRooms(category);
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

//Get featured rooms
export const getFeaturedRooms = createAsyncThunk(
  "room/featuredRooms",
  async (_, thunkAPI) => {
    try {
      return await roomService.featuredRooms();
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

//Get room
export const getRoom = createAsyncThunk(
  "room/getRoom",
  async (id, thunkAPI) => {
    try {
      return await roomService.getRoom(id);
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

//Get User Rooms Saved
export const getUserRoomsSaved = createAsyncThunk(
  "room/userRoomsSaved",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.getUserRoomsSaved(token);
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

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.rooms = [];
      state.filterRooms = [];
      state.roomsByCategory = [];
      state.featuredRooms = [];
      state.roomCategories = [];
      state.similarRooms = [];
      state.userRoomsSaved = [];
      state.room = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // All rooms
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Filter Rooms
      .addCase(getFilterRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilterRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.filterRooms = action.payload;
      })
      .addCase(getFilterRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Room categories
      .addCase(getRoomCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomCategories = action.payload;
      })
      .addCase(getRoomCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get rooms by category
      .addCase(getRoomsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roomsByCategory = action.payload;
      })
      .addCase(getRoomsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get featured rooms
      .addCase(getFeaturedRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredRooms = action.payload;
      })
      .addCase(getFeaturedRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get similar rooms
      .addCase(getSimilarRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSimilarRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.similarRooms = action.payload.rooms;
      })
      .addCase(getSimilarRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) // Get user rooms saved
      .addCase(getUserRoomsSaved.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserRoomsSaved.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userRoomsSaved = action.payload;
      })
      .addCase(getUserRoomsSaved.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Get room
      .addCase(getRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.room = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
