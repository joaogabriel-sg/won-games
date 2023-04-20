import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'

export const bannerMapper = (banners: QueryHome_banners[]) => {
  return banners.map((banner) => ({
    img: `http://localhost:1337${banner.image?.url}`,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon.text,
      ribbonSize: banner.ribbon.size,
      ribbonColor: banner.ribbon.color
    })
  }))
}

export const gamesMapper = (games: QueryGames_games[] | null | undefined) => {
  return (
    games &&
    games.map((game) => ({
      title: game.name,
      slug: game.slug,
      developer: game.developers[0].name,
      img: `http://localhost:1337${game.cover?.url}`,
      price: game.price
    }))
  )
}

export const highlightMapper = (
  object: QueryHome_sections_freeGames_highlight | null | undefined
) => {
  return {
    title: object?.title,
    subtitle: object?.subtitle,
    backgroundImage: `http://localhost:1337${object?.background?.url}`,
    floatImage: `http://localhost:1337${object?.floatImage?.url}`,
    buttonLabel: object?.buttonLabel,
    buttonLink: object?.buttonLink,
    alignment: object?.alignment
  }
}
