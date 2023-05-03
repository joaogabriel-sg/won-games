import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Game, { GameTemplateProps } from 'templates/Game'

import { getImageUrl } from 'utils/getImageUrl'
import { initializeApollo } from 'utils/apollo'

import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import { QUERY_UPCOMING } from 'graphql/queries/upcoming'
import {
  QueryUpcoming,
  QueryUpcomingVariables
} from 'graphql/generated/QueryUpcoming'

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <Game {...props} />
}

const apolloClient = initializeApollo()

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  })

  const paths = data.games.map(({ slug }) => ({ params: { slug } }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: params?.slug as string },
    fetchPolicy: 'no-cache'
  })

  if (!data.games.length) return { notFound: true }

  const game = data.games[0]

  const { data: recommendedSection } =
    await apolloClient.query<QueryRecommended>({
      query: QUERY_RECOMMENDED
    })

  const TODAY = new Date().toISOString().slice(0, 10) // 2022-04-20

  const { data: upcomingSection } = await apolloClient.query<
    QueryUpcoming,
    QueryUpcomingVariables
  >({
    query: QUERY_UPCOMING,
    variables: { date: TODAY }
  })

  return {
    props: {
      cover: getImageUrl(game.cover?.src),
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: getImageUrl(image.src),
        label: image.label as string
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: upcomingSection.showcase?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcomingSection.upcomingGames),
      upcomingHighlight: highlightMapper(
        upcomingSection.showcase?.upcomingGames?.highlight
      ),
      recommendedTitle: recommendedSection.recommended?.section?.title,
      recommendedGames: gamesMapper(
        recommendedSection.recommended?.section?.games
      )
    },
    revalidate: 60 // 1 minute
  }
}
