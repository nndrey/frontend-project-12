import { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { customSelectors } from '../../../slices/messagesSlice'
import FilterContext from '../../../contexts/FilterContext.js'

const MessagesBody = () => {
  const messages = useSelector(state => customSelectors.currentChannelMessages(state))
  const { clean } = useContext(FilterContext)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="chat-messages overflow-auto px-5 py-2 flex-grow-1">
      {messages.map(({ id, body, username }) => (
        <div key={`${id}-${username}-${body.slice(0, 5)}`} className="text-break mb-2">
          <strong className="me-1">
            {username}
            :
          </strong>
          {clean(body)}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessagesBody
