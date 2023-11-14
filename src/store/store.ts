import {configureStore} from "@reduxjs/toolkit";
import authDataReducer from "./features/authDataSlice";
import drawerDataReducer from "./features/drawerDataSlice";
import notification from "./features/notification";
import breadCrumbsDataReducer from "./features/breadCrumbsDataSlice";

const store = configureStore({
  reducer: {
    authData: authDataReducer,
    drawerData: drawerDataReducer,
    notification: notification,
    breadCrumbsData: breadCrumbsDataReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
