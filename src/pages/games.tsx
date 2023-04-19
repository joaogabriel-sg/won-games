import { GetStaticProps } from 'next'

import GamesTemplate, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'

import { initializeApollo } from 'utils/apollo'

import { QUERY_GAMES } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'

export default function GamesPage(props: GamesTemplateProps) {
  return <GamesTemplate {...props} />
}

export const getStaticProps: GetStaticProps<GamesTemplateProps> = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  })

  return {
    props: {
      filterItems: filterItemsMock,
      games: data.games.map((game) => ({
        slug: game.slug,
        title: game.name,
        developer: game.developers[0].name,
        img: `http://127.0.0.1:1337${game.cover!.url}`,
        price: new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD'
        }).format(game.price)
      }))
    },
    revalidate: 60 // 1 minute
  }
}
