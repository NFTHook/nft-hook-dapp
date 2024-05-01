import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    connect: false,
    isHamburger: false,
  },
  reducers: {
    setConnect: (state, { payload }) => {
      state.connect = payload
    },
    setHamburger: (state, { payload }) => {
      state.isHamburger = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const globalActions = globalSlice.actions

export default globalSlice.reducer
