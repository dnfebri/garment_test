import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios"

export const getSuccessStory = createAsyncThunk("story/getSuccessStory", async(_, thunkAPI) => {
  const response = await axios.get( process.env.API_URL_APP + 'success_story');
  return response.data;
});

export const saveSuccessStory = createAsyncThunk("story/saveSuccessStory", async(formData, thunkAPI) => {
  try {
    const response = await axios.post( process.env.API_URL_APP + 'success_story', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log('Post file', response);
    return response.data;
  } catch (error) {
    if(error){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const successStoryEntity = createEntityAdapter({
  selectId: (successStory) => successStory.id
});

const successStorySlice = createSlice({
  name: 'successStory',
  initialState: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    massage: "",
    data: successStoryEntity.getInitialState()
  },
  reducers: {
    reset: (state) => {
      state.isSuccess = false,
      state.isLoading = false,
      state.isError = false,
      state.massage = ""
    }
  },
  extraReducers:{
    [getSuccessStory.fulfilled]: (state, action) => {
      state.isLoading = false;
      successStoryEntity.setAll(state.data, action.payload)
    },
    [saveSuccessStory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [saveSuccessStory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.massage = action.payload.msg;
    },
    [saveSuccessStory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload.data.msg
    },
  }
});

export const {reset} = successStorySlice.actions;
export const successStorySelector = successStoryEntity.getSelectors(state => state.successStorys.data)
export default successStorySlice.reducer;