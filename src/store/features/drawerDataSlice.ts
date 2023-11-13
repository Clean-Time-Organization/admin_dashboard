import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  roundTitle: '',
  title: '',
  subTitle: '',
}

const drawerDataSlice = createSlice({
  name: 'drawerData',
  initialState,
  reducers: {
    setDrawerData(state, action) {
      state = action.payload
      return state
    },
  }
})

export const { setDrawerData } = drawerDataSlice.actions

export default drawerDataSlice.reducer
