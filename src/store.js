import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchslice"; 

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
