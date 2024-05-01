import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface State {
  address: string
}

const initialState: State = {
  address: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAddress } = userSlice.actions

export default userSlice.reducer
