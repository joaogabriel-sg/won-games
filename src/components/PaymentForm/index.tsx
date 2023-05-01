import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'

import Heading from 'components/Heading'
import Button from 'components/Button'
import { FormLoading } from 'components/Form'

import { useCart } from 'hooks/use-cart'

import { createPayment, createPaymentIntent } from 'utils/stripe/methods'

import * as S from './styles'

export type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const { push } = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        const data = await createPaymentIntent({
          items,
          token: session.jwt as string
        })

        if (data?.freeGames) {
          setFreeGames(true)
          setClientSecret('')
          return
        }

        if (data?.error) {
          setError(data.error)
          return
        }

        setClientSecret(data.client_secret)
        setFreeGames(false)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error?.message ?? null)
  }

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt as string
    })

    return data
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    if (freeGames) {
      await saveOrder()
      await push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`)
      setLoading(false)
      return
    }

    setError(null)

    await saveOrder(payload.paymentIntent)

    setLoading(false)

    await push('/success')
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineBottom>
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: { fontSize: '16px' }
                }
              }}
              onChange={handleChange}
            />
          )}

          {!!error && (
            <S.Error>
              <ErrorOutline size={20} />
              {error}
            </S.Error>
          )}
        </S.Body>

        <S.Footer>
          <Button as="a" fullWidth minimal>
            Continue shopping
          </Button>
          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={(!freeGames && (disabled || !!error)) || loading}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
