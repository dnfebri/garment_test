import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getPersonalTrainers = createAsyncThunk("pt/getPersonalTrainers", async(_, thunkAPI) => {
  try {
    const response = await axios.get( process.env.API_URL_APP + 'personal_training');
    return response.data;
  } catch (error) {
    console.log(error);
    if(error.response){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const savePersonalTrainer = createAsyncThunk("pt/savePersonalTrainer", async(formData, thunkAPI) => {
  try {
    const response = await axios.post( process.env.API_URL_APP + 'personal_training', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error Post file', error);
    if(error.response){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const updatePersonalTrainer = createAsyncThunk("pt/updatePersonalTrainer", async({id, formData}, thunkAPI) => {
  try {
    const response = await axios.put( process.env.API_URL_APP + 'personal_training/' + id , formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const deletePersonalTrainer = createAsyncThunk("pt/deletePersonalTrainer", async(id, thunkAPI) => {
  try {
    const response = await axios.delete( process.env.API_URL_APP + `personal_training/${id}`);
    return {res: response.data, id: id};
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const personalTrainerEntity = createEntityAdapter({
  selectId: (personalTrainer) => personalTrainer.id
});

const personalTrainerSlice = createSlice({
  name: 'personalTrainer',
  initialState: {
    errorGetData: false,
    isSuccess: false,
    isLoading: false,
    isError: false,
    massage: "",
    data: personalTrainerEntity.getInitialState()
  },
  reducers: {
    reset: (state) => {
      state.errorGetData = false,
      state.isSuccess = false,
      state.isLoading = false,
      state.isError = false,
      state.massage = ""
    }
  },
  extraReducers:{
    [getPersonalTrainers.fulfilled]: (state, action) => {
      state.isLoading = false;
      personalTrainerEntity.setAll(state.data, action.payload)
    },
    [getPersonalTrainers.rejected]: (state, action) => {
      state.isLoading = false;
      if(!action.payload) state.errorGetData = true;
    },
    [savePersonalTrainer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.massage = action.payload.msg;
    },
    [savePersonalTrainer.rejected]: (state, action) => {
      state.isError = true;
      state.massage = action.payload.data.msg
    },
    [updatePersonalTrainer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.massage = action.payload.msg;
    },
    [updatePersonalTrainer.rejected]: (state, action) => {
      state.isError = true;
      state.massage = action.payload.data.msg
    },
    [deletePersonalTrainer.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.massage = action.payload.res.msg
      personalTrainerEntity.removeOne(state.data, action.payload.id)
    },
    [deletePersonalTrainer.rejected]: (state, action) => {
      // console.log('deletePersonalTrainer.rejected', action);
      state.isError = true;
      state.massage = action.payload
    }
  }
});

export const {reset} = personalTrainerSlice.actions;
export const personalTrainerSelector = personalTrainerEntity.getSelectors(state => state.personalTrainers.data)
export default personalTrainerSlice.reducer;