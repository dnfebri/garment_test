import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("user/GetUser", async(_, thunkAPI) => {
  try {
    const response = await axios.get( process.env.API_URL_APP + 'users');
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const userEntity = createEntityAdapter({
  selectId: (user) => user.uuid
});

const userSlice = createSlice({
  name: 'user',
  initialState: userEntity.getInitialState(),
  extraReducers:{
    [getUsers.fulfilled]: (state, action) => {
      userEntity.setAll(state, action.payload)
    }
  }
});

export const userSelector = userEntity.getSelectors(state => state.users)
export default userSlice.reducer;