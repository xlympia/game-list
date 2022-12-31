import GameGrid from '../../components/GameGrid'
import Nav from '../../components/Nav'

export default function GamesPageDetails({ results }: any) {
  if (!results) {
    return <h1>Loading</h1>
  }

  console.log(results)

  return (
    <main>
      <Nav />
      <GameGrid results={results} />
    </main>
  )
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${params.id}&page_size=16&ordering=-rating`
  )
  const data = await res.json()

  const results = await data.results

  return {
    props: {
      results,
    },
  }
}
