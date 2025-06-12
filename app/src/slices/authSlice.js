import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'autn',
    initialState: {
        token: null,
        user: null,
    },
    reducers: {
        logIn(state, { payload }) {
            state.token = payload.token
            state.user = payload.username
        },
        logOut(state) {
            state.token = null
            state.user = null
        }
    }
})

export const { logIn, logOut } = authSlice.actions
export default authSlice.reducer
