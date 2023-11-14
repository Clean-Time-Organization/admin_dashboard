import {createSlice} from "@reduxjs/toolkit";

interface INotifications {
  notificationMessage: string;
  notificationType?: 'success' | 'error';
}

const initialState: INotifications = {
  notificationMessage: '',
}

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
  }
})

export const { setNotification } = notification.actions

export default notification.reducer
