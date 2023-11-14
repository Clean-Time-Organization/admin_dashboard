import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  title: '',
}

const breadCrumbsDataSlice = createSlice({
  name: 'breadCrumbsData',
  initialState,
  reducers: {
    setBreadCrumbsData(state, action) {
      state = action.payload
      return state
    },
  }
})

export const { setBreadCrumbsData } = breadCrumbsDataSlice.actions

export default breadCrumbsDataSlice.reducer
