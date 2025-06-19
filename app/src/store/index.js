import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import channelssSlice from '../slices/channelsSlice'
import massegesSlice from '../slices/massegesSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        channels: channelssSlice,
        masseges: massegesSlice,
    }
})