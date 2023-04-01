import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getFotoKelases = createAsyncThunk("fotoKelas/getFotoKelases", async() => {
  try {
    const response = await axios.get( process.env.API_URL_APP + 'foto_kelas');
    return response.data;
  } catch (error) {
    // console.log('getFotoKelases error', error);
    if(error.response){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const saveFotoKelas = createAsyncThunk("fotoKelas/saveFotoKelas", async(formData, thunkAPI) => {
  try {
    const response = await axios.post( process.env.API_URL_APP + 'foto_kelas', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log('Post file', response);
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const updateFotoKelas = createAsyncThunk("fotoKelas/updateFotoKelas", async({id, formData}, thunkAPI) => {
  try {
    const response = await axios.put( process.env.API_URL_APP + 'foto_kelas/' + id , formData, {
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

export const deleteFotoKelas = createAsyncThunk("fotoKelas/deleteFotoKelas", async(id, thunkAPI) => {
  try {
    const response = await axios.delete( process.env.API_URL_APP + `foto_kelas/${id}`);
    return {res: response.data, id: id};
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const fotoKelasEntity = createEntityAdapter({
  selectId: (FotoKelas) => FotoKelas.id
});

const fotoKelasSlice = createSlice({
  name: 'FotoKelas',
  initialState: {
    errorGetData: false,
    isSuccess: false,
    isLoading: false,
    isError: false,
    massage: "",
    data: fotoKelasEntity.getInitialState()
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
    [getFotoKelases.fulfilled]: (state, action) => {
      state.isLoading = false;
      fotoKelasEntity.setAll(state.data, action.payload)
    },
    [getFotoKelases.rejected]: (state, action) => {
      state.isLoading = false;
      if(!action.payload) state.errorGetData = true;
    },
    [saveFotoKelas.pending]: (state, action) => {
      state.isLoading = true;
    },
    [saveFotoKelas.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.massage = action.payload.msg;
    },
    [saveFotoKelas.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload.data.msg
    },
    [updateFotoKelas.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateFotoKelas.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.massage = action.payload.msg;
    },
    [updateFotoKelas.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload.data.msg
    },
    [deleteFotoKelas.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.massage = action.payload.res.msg
      fotoKelasEntity.removeOne(state.data, action.payload.id)
    },
    [deleteFotoKelas.rejected]: (state, action) => {
      state.isError = true;
      state.massage = action.payload
    }
  }
});

export const {reset} = fotoKelasSlice.actions;
export const fotoKelasSelector = fotoKelasEntity.getSelectors(state => state.fotoKelases.data)
export default fotoKelasSlice.reducer;