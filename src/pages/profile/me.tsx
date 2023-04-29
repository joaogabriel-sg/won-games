import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'
import FormProfile, { FormProfileProps } from 'components/FormProfile'

import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'

import { QUERY_PROFILE_ME } from 'graphql/queries/profile'
import { QueryProfileMe } from 'graphql/generated/QueryProfileMe'

export default function Me({ email, username }: FormProfileProps) {
  return (
    <Profile>
      <FormProfile username={username} email={email} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await protectedRoutes(context)

  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<QueryProfileMe>({
    query: QUERY_PROFILE_ME
  })

  return {
    props: {
      session,
      username: data?.me?.username,
      email: data?.me?.email
    }
  }
}
