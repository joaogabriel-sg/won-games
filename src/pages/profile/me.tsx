import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'
import FormProfile, { FormProfileProps } from 'components/FormProfile'

import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'

import { QUERY_PROFILE_ME } from 'graphql/queries/profile'
import {
  QueryProfileMe,
  QueryProfileMeVariables
} from 'graphql/generated/QueryProfileMe'

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

  if (!session) {
    return { props: {} }
  }

  const { data } = await apolloClient.query<
    QueryProfileMe,
    QueryProfileMeVariables
  >({
    query: QUERY_PROFILE_ME,
    variables: {
      identifier: session?.id as string
    }
  })

  return {
    props: {
      session,
      username: data?.user?.username,
      email: data?.user?.email
    }
  }
}
