import {configureStore} from "@reduxjs/toolkit";
import authDataReducer from "./features/authDataSlice";
import drawerDataReducer from "./features/drawerDataSlice";

const store = configureStore({
  reducer: {
    authData: authDataReducer,
    drawerData: drawerDataReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
