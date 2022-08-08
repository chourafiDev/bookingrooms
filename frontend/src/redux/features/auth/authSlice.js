import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  currentUser: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSaved: false,
  isUnSaved: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/regsiter",
  async (userData, thunkApi) => {
    try {
      return await authService.regsiter(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

//Logout user
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  await authService.logout();
});

//Get room
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getUser(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//Favorite room
export const favoriteRoom = createAsyncThunk(
  "auth/favoriteRoom",
  async (roomId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.favoriteRoom(roomId, token);
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

//unfavorite room
export const unFavoriteRoom = createAsyncThunk(
  "auth/unFavoriteRoom",
  async (roomId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.unFavoriteRoom(roomId, token);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.currentUser = {};
      state.isSaved = false;
      state.isUnSaved = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //Register user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.userData;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //Login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.userData;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //Logout user
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      })
      //Login user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) //Favorite room
      .addCase(favoriteRoom.pending, (state) => {
        state.isLoading = true;
        state.isSaved = true;
      })
      .addCase(favoriteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = false;
        if (state.currentUser.savedRooms.includes(action.payload.room)) {
          state.currentUser.savedRooms.splice(
            state.currentUser.savedRooms.findIndex(
              (roomId) => roomId === action.payload.room
            ),
            1
          );
        } else {
          state.currentUser.savedRooms.push(action.payload.room);
        }
      })
      .addCase(favoriteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSaved = true;
        state.message = action.payload;
      }) //unFavorite room
      .addCase(unFavoriteRoom.pending, (state) => {
        state.isLoading = true;
        state.isSaved = false;
      })
      .addCase(unFavoriteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = true;
        if (state.currentUser.savedRooms.includes(action.payload.room)) {
          state.currentUser.savedRooms.splice(
            state.currentUser.savedRooms.findIndex(
              (roomId) => roomId === action.payload.room
            ),
            1
          );
        } else {
          state.currentUser.savedRooms.push(action.payload.room);
        }
      })
      .addCase(unFavoriteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSaved = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
