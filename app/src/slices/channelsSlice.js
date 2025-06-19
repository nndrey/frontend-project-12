import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'channels',
    initialState: [],
    reducers: {
        addChannel: (state, { payload }) => {
            state.push(payload)
        },
        addChannels: (state, { payload }) => {
            state.splice(0, state.length, ...payload)
        },
        removeChannel: (state, { payload }) => {
            return state.filter((chan) => chan.id !== payload.id);
        }

    }
})

export const { addChannel, addChannels, removeChannel } = channelsSlice.actions
export default channelsSlice.reducer
