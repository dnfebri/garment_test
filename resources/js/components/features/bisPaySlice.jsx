import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getBisPay = createAsyncThunk("bisPay/getbisPay", async(_, thunkAPI) => {
  try {
    const response = await axios.get('https://klik.urbanathletes.co.id/api/v2/back-in-shapes/pay-proses');
    // const response = await axios.get('http://127.0.0.1:8000/api/v2/back-in-shapes/pay-proses');
    return response.data;
  } catch (error) {
    console.log(error);
    if(error.response){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const bisPayEntity = createEntityAdapter({
  selectId: (bisPay) => bisPay.id
});

const bisPaySlice = createSlice({
  name: 'bisPay',
  initialState: bisPayEntity.getInitialState(),
  extraReducers:{
    [getBisPay.fulfilled]: (state, action) => {
      bisPayEntity.setAll(state, action.payload.data)
    }
  }
});

export const bisPaySelector = bisPayEntity.getSelectors(state => state.bisPays)
export default bisPaySlice.reducer;