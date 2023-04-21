import { KeyboardArrowDown } from 'styled-icons/material-outlined'

import Base from 'templates/Base'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard, { GameCardProps } from 'components/GameCard'
import { Grid } from 'components/Grid'

import { useQueryGames } from 'graphql/queries/games'

import * as S from './styles'

export type GamesTemplateProps = {
  games?: GameCardProps[]
  filterItems: ItemProps[]
}

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  const { data, fetchMore } = useQueryGames({ variables: { limit: 15 } })

  const handleFilter = () => {
    return
  }

  const handleShowMore = () => {
    fetchMore({ variables: { limit: 15, start: data?.games.length } })
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        <section>
          <Grid>
            {data?.games.map((game) => (
              <GameCard
                key={game.slug}
                title={game.name}
                slug={game.slug}
                developer={game.developers[0].name}
                img={`http://127.0.0.1:1337${game.cover!.url}`}
                price={game.price}
              />
            ))}
          </Grid>

          <S.ShowMore role="button" onClick={handleShowMore}>
            <p>Show More</p>
            <KeyboardArrowDown size={35} />
          </S.ShowMore>
        </section>
      </S.Main>
    </Base>
  )
}

export default GamesTemplate
