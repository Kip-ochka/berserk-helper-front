import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import { squadSlice } from "./squadSlice";

const rootReducer = combineReducers({
  squad: squadSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
