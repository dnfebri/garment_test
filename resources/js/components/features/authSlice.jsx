import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const token = Cookies.get('token');
const tokenDecode = token ? jwt_decode(token) : '';
const uuid = tokenDecode ? tokenDecode.uuid : '';
const name = tokenDecode ? tokenDecode.name : '';
const email = tokenDecode ? tokenDecode.email : '';
const roleId = tokenDecode ? tokenDecode.roleId : '';
const role = tokenDecode ? tokenDecode.role : '';

const authState = {
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  massage: ""
}

const userState = {
  uuid: uuid,
  name: name,
  email: email,
  roleId: roleId,
  role: role
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
  try {
    const response = await axios.post( process.env.API_URL_APP + 'auth/login', {
      email: user.email,
      password: user.password
    });
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
  try {
    const response = await axios.get( process.env.API_URL_APP + 'auth/me');
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async(user, thunkAPI) => {
  await axios.delete( process.env.API_URL_APP + 'auth/logout');
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {authState, userState},
  reducers:{
    reset: (state) => {state.authState = authState},
    update: (state, action) => {
      // console.log('State Update', action);
      state.userState.uuid = action.payload.uuid
      state.userState.name = action.payload.name
      state.userState.email = action.payload.email
      state.userState.roleId = action.payload.roleId
      state.userState.role = action.payload.role
    }
  },
  extraReducers:(builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.authState.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.authState.isLoading = false;
      state.authState.isSuccess = true;
      state.authState.token = action.payload.token;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.authState.isLoading = false;
      state.authState.isError = true;
      state.authState.massage = action.payload;
    });

    // get User
    builder.addCase(getMe.pending, (state, action) => {
      // console.log(action);
      state.authState.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      // console.log(action);
      state.authState.isLoading = false;
      state.authState.isSuccess = true;
      // state.authState.token = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      // console.log('getMe.rejected', action);
      state.authState.isLoading = false;
      state.authState.isError = true;
      state.authState.massage = action.payload;
    });
  }
});

export const {reset, update} = authSlice.actions;
export default authSlice.reducer;