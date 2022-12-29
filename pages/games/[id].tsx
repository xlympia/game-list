import Link from 'next/link'
import { useRouter } from 'next/router'
import { LinkButtons } from '../../components/LinkButtons'
import GameGrid from '../../components/GameGrid'

export default function GamesPageDetails({ results }: any) {
  const router = useRouter()
  const id = router.query.id as string

  if (!results) {
    return <h1>Loading</h1>
  }

  return (
    <main>
      <LinkButtons>
        {parseInt(id) - 1 > 0 ? (
          <Link href={`/games/${parseInt(id) - 1}`}>&larr;</Link>
        ) : (
          <></>
        )}
        <Link href={`/games/${parseInt(id) + 1}`}>&rarr;</Link>
      </LinkButtons>

      <GameGrid results={results} />
    </main>
  )
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${params.id}&page_size=9`
  )
  const data = await res.json()

  const results = data.results

  return {
    props: {
      results,
    },
  }
}
