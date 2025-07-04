/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { fetchMessages, removeChannel } from './fetchData';

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.id,
});

const initialState = messagesAdapter.getInitialState({
  loading: false,
  error: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    sendMessage: (state, action) => {
      const { ...messageData } = action.payload;
      messagesAdapter.addOne(state, {
        id: messageData.id || Date.now().toString(),
        ...messageData,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        messagesAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeChannel.fulfilled, (state, { payload }) => {
        Object.values(state.entities).forEach((message) => {
          if (message.channelId === payload) {
            messagesAdapter.removeOne(state, message.id);
          }
        });
      });
  },
});

export const { addMessages, addMessage, sendMessage } = messagesSlice.actions;
export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

export const currentChannelMessages = createSelector(
  [
    (state) => state.messages.entities,
    (state) => state.channels.currentChannelId,
  ],
  (messages, currentChannelId) => Object.values(messages)
    .filter((msg) => msg.channelId === currentChannelId),
);

export const customSelectors = { currentChannelMessages };
