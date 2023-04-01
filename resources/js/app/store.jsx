import { configureStore } from '@reduxjs/toolkit';
import dataCrmReducer from "../features/dataCrmSlice";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import roleReducer from "../features/roleSlice";
import rp99kReducer from "../features/rp99kSlice";
import backInShapeReducer from "../features/backInShapeSlice";
import bisPayReducer from "../features/bisPaySlice";
import personalTrainerReducer from "../features/personalTrainerSlice";
import fotoKelasReducer from "../features/fotoKelasSlice";
import successStoryReducer from "../features/successStorySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    dataCrm: dataCrmReducer,
    rp99ks: rp99kReducer,
    backInShapes: backInShapeReducer,
    bisPays: bisPayReducer,
    personalTrainers: personalTrainerReducer,
    fotoKelases: fotoKelasReducer,
    successStorys: successStoryReducer,
  },
})