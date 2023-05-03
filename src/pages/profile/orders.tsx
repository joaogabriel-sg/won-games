import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'
import OrdersList, { OrdersListProps } from 'components/OrdersList'

import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'
import { ordersMapper } from 'utils/mappers'

import { QUERY_ORDERS } from 'graphql/queries/orders'
import {
  QueryOrders,
  QueryOrdersVariables
} from 'graphql/generated/QueryOrders'

export default function ProfileCards({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await protectedRoutes(context)

  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return { props: {} }
  }

  const { data } = await apolloClient.query<QueryOrders, QueryOrdersVariables>({
    query: QUERY_ORDERS,
    variables: {
      identifier: session?.id as string
    },
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      items: ordersMapper(data.orders),
      session
    }
  }
}
