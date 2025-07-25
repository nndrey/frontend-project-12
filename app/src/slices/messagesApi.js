import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { messagesUrl } from '../endpoints'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: messagesUrl(),
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth
      headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints(build) {
    return {
      getMessages: build.query({
        query: () => ({ url: '' }),
      }),
      addMessage: build.mutation({
        query: body => ({
          url: '',
          method: 'POST',
          body,
        }),
      }),
    }
  },
})

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi
