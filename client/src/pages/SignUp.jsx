import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import userService from './../services/users'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  authToken: yup.string().nullable(),
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
  {
    name: 'kideAuthToken',
    placeholder: 'Kide bearer token (optional)',
  },
]

const SignUp = () => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const submit = async ({ username, password, kideAuthToken }) => {
    try {
      const user = await userService.create({
        username,
        password,
        kideAuthToken,
      })
      console.log(user)
      setSubmitted(true)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      navigate('/home')
      window.location.reload()
    } catch (error) {
      setError(`Error: ${error}`)
    }
  }

  if (submitted) {
    return <p>User created!</p>
  }

  if (window.localStorage.getItem('loggedUser')) {
    return <p>Log out to create another user</p>
  }

  return (
    <>
      <div>
        <p>Sign up</p>
        <Formik
          initialValues={{
            username: '',
            password: '',
            kideAuthToken: '',
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

export default SignUp
