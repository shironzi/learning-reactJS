import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // getDefaultMiddleware includes redux-thunk by default
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
