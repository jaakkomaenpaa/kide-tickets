import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const validationSchema = yup.object().shape({
  eventUrl: yup.string().required('Event url is required'),
  authToken: yup.string().required('Bearer token is required'),
  ticketIndex: yup.number().nullable(),
  keyword: yup.string().nullable(),
})

const ReservationForm = ({ setSubmitted, setSaleStartTime, submit }) => {

  const fieldInfo = [
    {
      name: 'eventUrl',
      placeholder: 'Event url',
    },
    {
      name: 'authToken',
      placeholder: 'Bearer token',
    },
    {
      name: 'ticketIndex',
      placeholder: 'Ticket index (optional, check help tab)',
    },
    {
      name: 'keyword',
      placeholder: 'Keyword (optional, check help tab)',
    },
  ]

  return (
    <>
      <div>
        <p>Reservation form</p>
        <Formik
          initialValues={{
            eventUrl: '',
            authToken: '',
            ticketIndex: '',
            keyword: '',
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
                    type='text'
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

export default ReservationForm
