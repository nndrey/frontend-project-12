/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    username: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
      state.username = action.payload.username
    },
    logout: (state) => {
      state.token = null
      state.username = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
