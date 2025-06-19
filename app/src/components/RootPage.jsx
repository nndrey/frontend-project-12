import axios from 'axios'
import routes from '../routes'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../slices/authSlice'
import { addChannels } from '../slices/channelsSlice'
import { getMasseges } from '../slices/massegesSlice'


const RootPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return userId?.token ? { Authorization: `Bearer ${userId.token}` } : {}
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      const { token, username } = JSON.parse(userId)
      if (token && username) {
        const dataUser = { token, username }
        dispatch(logIn(dataUser))
      } else {
        navigate('/login')
        return;
      }
    } else {
      navigate('/login')
      return;
    }

    const fetchChannels = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() })
      dispatch(addChannels(data))
    }

    const fetchMessages = async () => {
      const { data } = await axios.get(routes.messagesPath(), { headers: getAuthHeader() })
      dispatch(getMasseges(data))
    }

    fetchChannels()
    fetchMessages()
  }, [navigate, dispatch])

  const channels = useSelector((state) => state.channels)
  const [currentChannel, setCurrentChannel] = useState(null)
  const masseges = useSelector((state) => state.masseges)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (channels.length > 0) {
      setCurrentChannel(channels[0])
    }
  }, [channels]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  };

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const userId = JSON.parse(localStorage.getItem('userId'))
    const newMessage = {
      body: message,
      channelId: currentChannel.id,
      username: userId.username,
    };
    await axios.post(routes.messagesPath(), newMessage, { headers: getAuthHeader() })
    setMessage('')
    const { data } = await axios.get(routes.messagesPath(), { headers: getAuthHeader() })
    dispatch(getMasseges(data))
  };

  if (!currentChannel) {
    return <div>Loading...</div>
  }

const selectChannel = (e) => {
  const channelName = e.currentTarget.getAttribute('data-rb-event-key').substring(1)
  const selectedChannel = channels.find((channel) => channel.name === channelName)
  setCurrentChannel(selectedChannel)
};

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container >
          <Navbar.Brand className="header-nav" href="#">
            Chat-WYS
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="chat-container">
        <Row>
          <h4>Channels</h4>
          <Tab.Container id="left-tabs-example" defaultActiveKey={`#${currentChannel.name}`}>
            <Row>
              <Col sm={3} className="channels-block">
                <Nav variant="pills" className="flex-column nav-channels">
                  {channels.map((chan) => (
                    <Nav.Link key={chan.id} eventKey={`#${chan.name}`} onClick={selectChannel} data-rb-event-key={`#${chan.name}`}>
                      {`#${chan.name}`}
                    </Nav.Link>
                  ))}
                </Nav>
              </Col>
              <Col sm={9} className="messages-block">
                <Tab.Content>
                  <Tab.Pane eventKey={`#${currentChannel.name}`}>
                    {masseges.filter(mes => mes.channelId === currentChannel.id).map(mes => (
                      <div key={mes.id}><b>{mes.username}</b>: {mes.body}</div>
                    ))}
                  </Tab.Pane>
                </Tab.Content>
                <div className="input-form">
                      <Form onSubmit={handleSendMessage}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          value={message}
                          onChange={handleMessageChange}
                          placeholder="Type your message..."
                        />
                      </Form.Group>
                      <Button type="submit"  className="mt-2 btn btn-info">Send</Button>
                    </Form>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Row>
      </Container>
    </div>
  )
}

export default RootPage
