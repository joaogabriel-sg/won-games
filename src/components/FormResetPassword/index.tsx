import { FormEvent, useState } from 'react'
import { signin } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ErrorOutline, Lock } from 'styled-icons/material-outlined'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormError, FormLoading, FormWrapper } from 'components/Form'

import { FieldErrors, resetValidate } from 'utils/validations'

const FormResetPassword = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ password: '', confirm_password: '' })
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = resetValidate(values)

    setFormError('')

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: values.password,
          passwordConfirmation: values.confirm_password,
          code: query?.code
        })
      }
    )

    const data = await response.json()

    if (data?.error) {
      setFormError(data.message[0].messages[0].message)
      setLoading(false)
      return
    }

    await signin('credentials', {
      email: data.user.email,
      password: values.password,
      callbackUrl: '/'
    })
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          {formError}
        </FormError>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          error={fieldError?.password}
          onInputChange={(value) => handleInput('password', value)}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          icon={<Lock />}
          error={fieldError?.confirm_password}
          onInputChange={(value) => handleInput('confirm_password', value)}
        />

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Reset password</span>}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
