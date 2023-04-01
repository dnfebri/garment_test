import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getBackInShapes = createAsyncThunk("backInShape/getBackInShape", async(_, thunkAPI) => {
  try {
    const response = await axios.get('https://klik.urbanathletes.co.id/api/v2/back-in-shapes');
    // const response = await axios.get('http://127.0.0.1:8000/api/v2/back-in-shapes');
    return response.data;
  } catch (error) {
    console.log(error);
    if(error.response){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const backInShapeEntity = createEntityAdapter({
  selectId: (backInShape) => backInShape.id
});

const backInShapeSlice = createSlice({
  name: 'backInShape',
  initialState: backInShapeEntity.getInitialState(),
  extraReducers:{
    [getBackInShapes.fulfilled]: (state, action) => {
      backInShapeEntity.setAll(state, action.payload.data)
    }
  }
});

export const backInShapeSelector = backInShapeEntity.getSelectors(state => state.backInShapes)
export default backInShapeSlice.reducer;