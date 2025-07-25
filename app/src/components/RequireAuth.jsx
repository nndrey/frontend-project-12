import { useLocation, Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { loginPagePath } from '../routes'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const { token } = useSelector(state => state.auth)

  return token ? children : <Navigate to={loginPagePath()} state={{ from: location }} />
}

export default RequireAuth
