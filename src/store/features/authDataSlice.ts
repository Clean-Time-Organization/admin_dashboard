import {createSlice} from "@reduxjs/toolkit";

export const initialAuthDataState = {
  email: '',
  firstName: '',
  lastName: '',
}

const authDataSlice = createSlice({
  name: 'authData',
  initialState: initialAuthDataState,
  reducers: {
    setAuthData(state, action) {
      state = action.payload
      return state
    },
  }
})

export const { setAuthData } = authDataSlice.actions

export default authDataSlice.reducer
