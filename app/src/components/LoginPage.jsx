import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
console.log('render')
  return (
    <div>
      <h1>Portal</h1>
      <Formik 
    initialValues={{userName:'', password: ''}}
    validationSchema={Yup.object({
      userName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string().required().min(6),
    })}
    onSubmit={values => {
      console.log(`Welcome: ${JSON.stringify(values)}`);
    }}
    >
      <Form>
        <label htmlFor="userName">Your Name</label>
          <Field name="userName" type="text" placeholder='name'/>
          <div>
            <ErrorMessage name="userName" />
          </div>

        <label htmlFor="password">Your Password</label>
          <Field name="password" type="password" placeholder='password' />
          <div>
            <ErrorMessage name="password" />
          </div>

          <button type="submit">Welcome</button>
      </Form>
    </Formik>
    </div>
  )
};

export default LoginPage
