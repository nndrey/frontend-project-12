import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutSlice, login as loginSlice } from '../slices/authSlice.js'
import { loginPagePath } from '../routes.js'

const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOut = () => {
    localStorage.removeItem('user')
    dispatch(logoutSlice())
    navigate(loginPagePath())
  }
  const logIn = (username, token) => {
    localStorage.setItem('user', JSON.stringify({ token, username }))
    dispatch(loginSlice({ token, username }))
  }
  const { username, token } = useSelector(state => state.auth)
  return {
    logIn, logOut, username, token,
  }
}

export default useAuth
