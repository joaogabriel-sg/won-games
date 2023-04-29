import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'
import CardsList, { CardsListProps } from 'components/CardsList'

import mockCards from 'components/PaymentOptions/mock'

import protectedRoutes from 'utils/protected-routes'

export default function ProfileCards({ cards }: CardsListProps) {
  return (
    <Profile>
      <CardsList cards={cards} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps<CardsListProps> = async (
  context
) => {
  const session = await protectedRoutes(context)

  return {
    props: {
      cards: mockCards,
      session
    }
  }
}
