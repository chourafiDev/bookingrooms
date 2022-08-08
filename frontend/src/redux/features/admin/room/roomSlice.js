import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roomService from "./roomService";

const initialState = {
  rooms: [],
  room: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  isUpdated: false,
  isAdded: false,
  messageSuccess: "",
  message: "",
};

//All rooms
export const getRooms = createAsyncThunk(
  "adminRoom/allRooms",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.allRooms(token);
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
  "adminRoom/getRoom",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.getRoom(id, token);
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

//Update room
export const updateRoom = createAsyncThunk(
  "adminRoom/updateRoom",
  async (roomInfo, thunkAPI) => {
    try {
      const { roomId, roomData } = roomInfo;
      const token = thunkAPI.getState().auth.user.token;

      return await roomService.updateRoom(roomId, roomData, token);
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

//Add room
export const addRoom = createAsyncThunk(
  "adminRoom/addRoom",
  async (roomData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.addRoom(roomData, token);
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

//delete room
export const deleteRoom = createAsyncThunk(
  "adminRoom/deleteRoom",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roomService.deleteRoom(id, token);
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
  name: "adminRoom",
  initialState,
  reducers: {
    reset: (state) => {
      state.rooms = [];
      state.room = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isUpdated = false;
      state.isAdded = false;
      state.messageSuccess = "";
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
      }) //New room
      .addCase(addRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdded = true;
        state.rooms.push(action.payload.room);
        state.messageSuccess = action.payload.message;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) //Update room
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.rooms.push(action.payload.room);
        state.messageSuccess = action.payload.message;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) //Delete room
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdded = true;
        state.rooms = state.rooms.filter(
          (room) => room._id !== action.payload.id
        );
        state.messageSuccess = action.payload.message;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
