import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'
import FormProfile from 'components/FormProfile'

import protectedRoutes from 'utils/protected-routes'

export default function Me() {
  return (
    <Profile>
      <FormProfile />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await protectedRoutes(context)

  return {
    props: { session }
  }
}
