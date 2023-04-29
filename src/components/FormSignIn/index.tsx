import { FormEvent, useState } from 'react'
import { signin } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Email, ErrorOutline, Lock } from 'styled-icons/material-outlined'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormError, FormLink, FormLoading, FormWrapper } from 'components/Form'

import { FieldErrors, signInValidate } from 'utils/validations'

import * as S from './styles'

const FormSignIn = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { query, push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = signInValidate(values)

    setFormError('')

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const result = await signin('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
    })

    if (result?.url) {
      return push(result.url)
    }

    setLoading(false)
    setFormError('email or password is invalid')
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
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
          error={fieldError?.email}
          onInputChange={(value) => handleInput('email', value)}
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          error={fieldError?.password}
          onInputChange={(value) => handleInput('password', value)}
        />

        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in now</span>}
        </Button>

        <FormLink>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
