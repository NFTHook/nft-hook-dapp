import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Device = 'desktop' | 'mobile'
interface State {
  device: Device
}

const initialState: State = {
  device: 'desktop'
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<Device>) => {
      state.device = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDevice } = globalSlice.actions

export default globalSlice.reducer
