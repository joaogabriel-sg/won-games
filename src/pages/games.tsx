import { GetStaticProps } from 'next'

import GamesTemplate, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'

import { initializeApollo } from 'utils/apollo'

import { QUERY_GAMES } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'

export default function GamesPage(props: GamesTemplateProps) {
  return <GamesTemplate {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 15 }
  })

  return {
    props: {
      filterItems: filterItemsMock,
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 60 // 1 minute
  }
}
