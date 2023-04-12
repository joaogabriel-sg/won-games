import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'
import CardsList, { CardsListProps } from 'components/CardsList'

import mockCards from 'components/PaymentOptions/mock'

export default function ProfileCards({ cards }: CardsListProps) {
  return (
    <Profile>
      <CardsList cards={cards} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps<
  CardsListProps
> = async () => {
  return {
    props: {
      cards: mockCards
    }
  }
}
