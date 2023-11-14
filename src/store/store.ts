import {configureStore} from "@reduxjs/toolkit";
import authDataReducer from "./features/authDataSlice";
import drawerDataReducer from "./features/drawerDataSlice";
import notification from "./features/notification";

const store = configureStore({
  reducer: {
    authData: authDataReducer,
    drawerData: drawerDataReducer,
    notification: notification,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
