import { createSlice } from '@reduxjs/toolkit';

const massegesSlice = createSlice({
    name: 'masseges',
    initialState: [],
    reducers: {
        addMassege: (state, { payload }) => {
            state.push(payload)
        },
        getMasseges: (state, { payload }) => {
            state.splice(0, state.length, ...payload)
        },
        removeMassege: (state, { payload }) => {
            return state.filter((mass) => mass.id !== payload.id);
        }

    }
})

export const { addMassege, getMasseges, removeMassege } = massegesSlice.actions
export default massegesSlice.reducer