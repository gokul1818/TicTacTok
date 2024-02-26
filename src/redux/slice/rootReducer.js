import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const reducers = combineReducers({
  authSlice: authSlice,
});

export default reducers;
