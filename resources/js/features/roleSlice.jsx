import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getRoles = createAsyncThunk("role/getRole", async(_, thunkAPI) => {
  try {
    const response = await axios.get( process.env.API_URL_APP + 'roles');
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const saveRoles = createAsyncThunk("role/saveRole", async({name}, thunkAPI) => {
  try {
    const response = await axios.post( process.env.API_URL_APP + 'roles', {
      name: name
    });
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const updateRoles = createAsyncThunk("role/updateRoles", async({id, name}, thunkAPI) => {
  try {
    console.log('update', name);
    const response = await axios.put( process.env.API_URL_APP + `roles/${id}`, {
      name: name
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const deleteRoles = createAsyncThunk("role/deleteRole", async(id) => {
  try {
    const response = await axios.delete( process.env.API_URL_APP + `roles/${id}`);
    return id;
  } catch (error) {
    if(error.response){
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

const roleEntity = createEntityAdapter({
  selectId: (role) => role.id
});

const roleSlice = createSlice({
  name: 'role',
  initialState: roleEntity.getInitialState(),
  extraReducers:{
    [getRoles.fulfilled]: (state, action) => {
      roleEntity.setAll(state, action.payload)
    },
    [saveRoles.fulfilled]: (state, action) => {
      console.log('saveRoles.fulfilled', action.payload);
      roleEntity.addOne(state, action.payload.data)
    },
    [updateRoles.fulfilled]: (state, action) => {
      roleEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
    },
    [deleteRoles.fulfilled]: (state, action) => {
      roleEntity.removeOne(state, action.payload)
    }
  }
});

export const roleSelector = roleEntity.getSelectors(state => state.roles)
export default roleSlice.reducer;