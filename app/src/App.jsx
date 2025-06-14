import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import RootPage from './components/RootPage.jsx'
import './App.css'

function App() {
return (
    <BrowserRouter>
      <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<RootPage/> } />
          <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
)
}

export default App
