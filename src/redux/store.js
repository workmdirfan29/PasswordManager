import { configureStore } from "@reduxjs/toolkit";
import passwordReducer from "./slice/passwordSlice";

const store = configureStore({
  reducer: {
    passwords: passwordReducer,
  },
});

export default store;
