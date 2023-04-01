import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getClubs = createAsyncThunk("clubs/getClubs", async() => {
  const response = await axios.get('https://api.urbanathletes.co.id/fitness/v1/branch');
  return response.data;
});

const dataCrmSlice = createSlice({
  name: 'club',
  initialState: {clubs: []},
  extraReducers:{
    [getClubs.fulfilled]: (state, action) => {
      state.clubs = action.payload.data.rows
    }
  }
});

export default dataCrmSlice.reducer;