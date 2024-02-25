import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import loginService from './../services/login'

const validationSchema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),
})

const fieldInfo = [
  {
    name: 'username',
    placeholder: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
]

const Login = () => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const submit = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setSubmitted(true)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      navigate('/home')
      window.location.reload()
    } catch (error) {
      setError(`Error: ${error}`)
    }
  }

  if (submitted) {
    return <p>Logged in!</p>
  }

  if (window.localStorage.getItem('loggedUser')) {
    return <p>You are already logged in</p>
  }

  return (
    <>
      <div>
        <p>Log in</p>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form className='form'>
              {fieldInfo.map((field) => (
                <div key={field.name} className='inputContainer'>
                  <Field
                    className='inputField'
                    type={field.type || 'text'}
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                  <ErrorMessage
                    className='error'
                    name={field.name}
                    component='div'
                  />
                </div>
              ))}
              <div className='error'>{error}</div>
              <button
                className='submitButton'
                type='submit'
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Login
