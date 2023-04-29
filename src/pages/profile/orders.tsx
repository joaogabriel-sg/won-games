import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'
import OrdersList, { OrdersListProps } from 'components/OrdersList'

import ordersMock from 'components/OrdersList/mock'

import protectedRoutes from 'utils/protected-routes'

export default function ProfileCards({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await protectedRoutes(context)

  return {
    props: {
      items: ordersMock,
      session
    }
  }
}
