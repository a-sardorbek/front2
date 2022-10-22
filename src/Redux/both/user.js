import axios from "axios";
import api, { API_URL } from "../../Utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//admin and super-admin login
export const postLogin = createAsyncThunk(
  "userSlice/postLogin",
  async function (userData, { rejectWithValue, dispatch }) {
    try {
      let response = await axios.post(`${API_URL}/user/login`,userData);
      if (response.status === 200 || response.status === 201) {
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("firstName", response.data.firstName, { path: "/" });
        cookies.set("lastName", response.data.lastName, { path: "/" });
        cookies.set("phoneNumber", response.data.phoneNumber, { path: "/" });
        cookies.set("role", response.data.role, { path: "/" });
        cookies.set("id", response.data.id, { path: "/" });
        cookies.remove("error", { path: "/" });
        return { ...response.data };
      }
      if (!response.status) {
        cookies.set("error", "error occured", { path: "/" });
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      cookies.set("error", "error occured", { path: "/" });
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

//super-admin and admin  edit profile
export const editProfiles = createAsyncThunk(
  "userSlice/editProfile",
  async function (userData, { rejectWithValue, dispatch }) {
    try {
      let response = await api.put(`/api/system-user/update-profile`, userData);
      if (response.status === 200 || response.status === 201) {
        cookies.set("firstName", response.data.firstName, { path: "/" });
        cookies.set("lastName", response.data.lastName, { path: "/" });
        cookies.set("phoneNumber", response.data.phoneNumber, { path: "/" });
        return { ...response.data };
      }
      if (!response.status) {
        throw new Error("Internal Server Error");
      }
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

//super-admin and admin  edit password
export const editPasswords = createAsyncThunk(
  "userSlice/editProfile",
  async function (userData, { rejectWithValue, dispatch }) {
    try {
      let response = await api.put(
        `/api/system-user/update-password`,
        userData
      );
      if (response.status === 200 || response.status === 201) {
      }
      if (!response.status) {
        throw new Error("Internal Server Error");
      }
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

//super-admin and admin  edit cities
export const editCities = createAsyncThunk(
  "userSlice/editCities",
  async function (userData, { rejectWithValue, dispatch }) {
    try {
      let response = await api.put(
        `/api/city/update`,
        userData
      );
      if (response.status === 200 || response.status === 201) {
      }
      if (!response.status) {
        throw new Error("Internal Server Error");
      }
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const users = createSlice({
  name: "userSlice",
  initialState: {
    firstName: cookies.get("firstName") ?? null,
    lastName: cookies.get("lastName") ?? null,
    phoneNumber: cookies.get("phoneNumber") ?? null,
    status: null,
    error: null,
    role: cookies.get("role") ?? null,
    cities: {
        data: [],
        status: null,
        error: null
    },
  },
  reducers: {
    logoutUser: (state, action) => {
      state.role = null;
      state.phoneNumber = null;
      state.lastName = null;
      state.firstName = null;
      state.status = null;
      state.error = null;
      cookies.remove("firstName");
      cookies.remove("lastName");
      cookies.remove("phoneNumber");
      cookies.remove("error");
    },
  },
  extraReducers: {
    [postLogin.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [postLogin.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.phoneNumber = action.payload.phoneNumber;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
    },
    [postLogin.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [editProfiles.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [editProfiles.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.phoneNumber = action.payload.phoneNumber;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    [editProfiles.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [editCities.pending]: (state) => {
        state.status = "pending";
        state.error = null;
      },
      [editCities.fulfilled]: (state, action) => {
        state.status = "resolved";
      },
      [editCities.rejected]: (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      },
  },
});

export const { logoutUser } = users.actions;

export default users.reducer;
