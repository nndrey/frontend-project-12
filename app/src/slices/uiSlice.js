import { createSlice } from '@reduxjs/toolkit'

const currentChannelIdSlice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: '1',
    defaultChannelId: '1',
    modal: {
      isOpen: false,
      type: null,
      extra: {
        channelId: null,
        channelName: null,
      },
    },
  },
  reducers: {
    setCurrentChannelId(state, { payload: { id } }) {
      state.currentChannelId = id
    },
    openModal(state, { payload: { type, channelId, channelName } }) {
      if (channelName) state.modal.extra.channelName = channelName
      if (channelId) state.modal.extra.channelId = channelId
      state.modal.type = type
      state.modal.isOpen = true
    },
    closeModal(state) {
      state.modal.isOpen = false
      state.modal.type = null
      state.modal.extra.channelId = null
      state.modal.extra.channelName = null
    },
  },
})

export const { setCurrentChannelId, openModal, closeModal } = currentChannelIdSlice.actions
export default currentChannelIdSlice.reducer
