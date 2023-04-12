import { GetServerSideProps } from 'next'

import Cart, { CartTemplateProps } from 'templates/Cart'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import itemsMock from 'components/CartList/mock'
import cardsMock from 'components/PaymentOptions/mock'

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />
}

export const getServerSideProps: GetServerSideProps<
  CartTemplateProps
> = async () => {
  return {
    props: {
      recommendedGames: gamesMock,
      recommendedHighlight: highlightMock,
      items: itemsMock,
      total: 'R$ 430,00',
      cards: cardsMock
    }
  }
}
