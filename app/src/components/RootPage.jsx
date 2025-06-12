import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../slices/authSlice';


const RootPage = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(() => {
  const userId = localStorage.getItem('userId');
    if (userId) {
      const { token , username } = JSON.parse(userId);
      if (token && username) {
        const dataUser = { token, username };
        dispatch(logIn(dataUser));
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
}, [ navigate, dispatch])

  return (
    <div>
      I am root
    </div>
    )
}

export default RootPage
