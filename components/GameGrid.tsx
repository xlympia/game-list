import styled from 'styled-components'
import Game from './Game'
import router from 'next/router'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  text-align: center;
`

export default function GameGrid({ results }: any) {
  return (
    <Grid>
      {results.map((game: any) => {
        const { name, slug, background_image: image, rating } = game
        return (
          <Game
            key={slug}
            src={image ?? ''}
            name={name}
            rating={rating}
            onClick={() => router.push(`/game/${slug}`)}
          />
        )
      })}
    </Grid>
  )
}
