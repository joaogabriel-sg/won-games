import { GetStaticProps } from 'next'

import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

export default function Index(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export const getStaticProps: GetStaticProps<
  WishlistTemplateProps
> = async () => {
  return {
    props: {
      // games: gamesMock,
      recommendedGames: gamesMock.slice(0, 5),
      recommendedHighlight: highlightMock
    }
  }
}
