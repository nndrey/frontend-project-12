import axios from 'axios'
//import * as Yup from 'yup';
import { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, Field, ErrorMessage, Form as FormFromFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom'
import routes from '../routes';
import { logIn } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import portalImg from '../img/portal.png';

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const inputEl = useRef(null)
  const [ error, setError ] = useState(null)
  
  useEffect(() => {
    inputEl.current.select()
  }, [])
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='header-nav' href="#">Chat-WYS</Navbar.Brand>
      </Container>
    </Navbar>
    <div className='container for-card'>
<Card className="text-center loginCard" style={{maxWidth: '900px'}}>

    <Card.Header className='header-login'>Portal</Card.Header>
      <div className="container-wiht-img">
      <Card.Body style={{maxWidth: '500px'}}>
        <Formik 
    initialValues={{username:'', password: ''}}
    /* validationSchema={Yup.object({
      username: Yup.string()
        .max(15)
        .required(),
      password: Yup.string().required('').min(5, 'Неверные имя пользователя или пароль'),
    })} */
    onSubmit={async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data))
        const {token, username} = JSON.parse(localStorage.getItem('userId'))
        const dataUser = { token, username }
        console.log(dataUser)
        dispatch(logIn(dataUser))
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from)
      }
      catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setError('Неверные имя пользователя или пароль')
          inputEl.current.select()
          return
          }
        }
        finally {
          setSubmitting(false)
      }
    }}
    >
      <FormFromFormik>
<Form.Group className="form-floating mb-3">
  <Field
    required={true}
    name="username"
    type="text"
    placeholder="name"
    id="username"
    innerRef={inputEl}
    className={`form-control ${ error ? "is-invalid" : ""}`}
  />
  <Form.Label htmlFor="username">Your Name</Form.Label>
</Form.Group>

<Form.Group className="form-floating mb-4">
  <Field
    required={true}
    name="password"
    type="password"
    placeholder="password"
    className={`form-control ${ error ? "is-invalid" : ""}`}
  />
  <Form.Label htmlFor="password">Your Password</Form.Label>
  { error ? <div className='invalid-tooltip'>{ error }</div> : null }
</Form.Group>
    <Button variant="primary" type="submit" className='w-100 mb-3 mt-2 btn-success'>Welcome</Button>
      </FormFromFormik>
    </Formik>
      </Card.Body>
      <div className="portal-img">
        <a href="#"><img src={portalImg} alt="portal here" /></a>
      </div>
        </div>
      <Card.Footer className="text-muted">footer</Card.Footer>
    </Card>
    </div>
    </div>
  )
};

export default LoginPage
