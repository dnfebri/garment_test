import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getRp99k = createAsyncThunk("rp99k/getRp99k", async({page, search}, thunkAPI) => {
  try {
    const response = await axios.get(`https://klik.urbanathletes.co.id/api/rp99k?page=${page}&keyword=${search}`);
    return response.data;
  } catch (error) {
    if(error){
      const massage = error.message;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const rp99kEntity = createEntityAdapter({
  selectId: (rp99k) => rp99k.id
});

const rp99kSlice = createSlice({
  name: 'rp99k',
  initialState: {
    page: 0,
    pages: 0,
    rows: 0,
    clubs: [],
    data: rp99kEntity.getInitialState()
  },
  extraReducers:{
    [getRp99k.fulfilled]: (state, action) => {
      state.page = action.payload.data.current_page;
      state.pages = action.payload.data.last_page;
      state.rows = action.payload.data.total;
      state.clubs = action.payload.clubs;
      rp99kEntity.setAll(state.data, action.payload.data.data)
    }
  }
});

export const rp99kSelector = rp99kEntity.getSelectors(state => state.rp99ks.data)
export default rp99kSlice.reducer;