import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'
import { bannerMapper, cartMapper, gamesMapper, highlightMapper } from '.'
import { QueryGames_games } from 'graphql/generated/QueryGames'

describe('bannerMapper()', () => {
  it('should return the correct format when mapped', () => {
    const banner = {
      image: {
        url: '/image.jpg'
      },
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'Banner button label',
        link: 'Banner button link'
      },
      ribbon: {
        text: 'Banner ribbon text',
        size: 'small',
        color: 'primary'
      }
    } as QueryHome_banners

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: 'http://localhost:1337/image.jpg',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'Banner button label',
        buttonLink: 'Banner button link',
        ribbon: 'Banner ribbon text',
        ribbonSize: 'small',
        ribbonColor: 'primary'
      }
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the correct format when mapped', () => {
    const game = {
      id: '1',
      name: 'Game name',
      slug: 'game-name',
      developers: [{ name: 'Developer name' }],
      cover: { url: '/image.jpg' },
      price: 200
    } as QueryGames_games

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'Game name',
        slug: 'game-name',
        developer: 'Developer name',
        img: 'http://localhost:1337/image.jpg',
        price: 200
      }
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return empty object if no highlight', () => {
    expect(highlightMapper(null)).toStrictEqual({})
  })

  it('should return the correct format when mapped', () => {
    const highlight = {
      title: 'Highlight title',
      subtitle: 'Highlight subtitle',
      background: { url: '/image.jpg' },
      floatImage: { url: '/image.jpg' },
      buttonLabel: 'Highlight button label',
      buttonLink: 'Highlight button link',
      alignment: 'right'
    } as QueryHome_sections_freeGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'Highlight title',
      subtitle: 'Highlight subtitle',
      backgroundImage: 'http://localhost:1337/image.jpg',
      floatImage: 'http://localhost:1337/image.jpg',
      buttonLabel: 'Highlight button label',
      buttonLink: 'Highlight button link',
      alignment: 'right'
    })
  })
})

describe('cartMapper()', () => {
  it('should return empty array if no games', () => {
    expect(cartMapper(undefined)).toStrictEqual([])
  })

  it('should return the correct format when mapped', () => {
    const game = {
      id: '1',
      name: 'Game name',
      cover: { url: '/image.jpg' },
      price: 200
    } as QueryGames_games

    expect(cartMapper([game])).toStrictEqual([
      {
        id: '1',
        img: 'http://localhost:1337/image.jpg',
        price: '$200.00',
        title: 'Game name'
      }
    ])
  })
})
