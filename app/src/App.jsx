import { ToastContainer } from 'react-toastify'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import RequireAuth from './components/RequireAuth.jsx'
import Layout from './components/Layout.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import MainPage from './components/MainPage.jsx'
import SignupPage from './components/SignupPage.jsx'
import './locale/i18next.js'
import rollbarConfig from '../rollbar.config.js'
import { mainPagePath, loginPagePath, signUpPagePath } from './routes.js'

const App = ({ store }) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <ToastContainer hideProgressBar />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path={loginPagePath()} element={<LoginPage />} />
              <Route
                path={mainPagePath()}
                element={(
                  <RequireAuth>
                    <MainPage />
                  </RequireAuth>
                )}
              />
              <Route path={signUpPagePath()} element={<SignupPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
)
export default App
