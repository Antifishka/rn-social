import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { auth, authReducer } from "./auth/auth-slice";

const rootReducer = combineReducers({
  [auth]: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});