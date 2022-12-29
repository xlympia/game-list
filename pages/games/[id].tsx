import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Game = styled.div`
  display: flex;
  border: 2px solid #777;
  padding: 1rem;
  border-radius: 12px;
  flex-direction: column;

  img {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  p {
    font-size: 1.2rem;
  }
`

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  text-align: center;
`

export default function GamesPageDetails({ data }: any) {
  const { results } = data
  const router = useRouter()
  const id = router.query.id as string

  if (!data) {
    return <h1>Loading</h1>
  }

  return (
    <main>
      <Link href={`/games/${parseInt(id) + 1}`}>Next page</Link>
      {parseInt(id) - 1 > 0 ? (
        <Link href={`/games/${parseInt(id) - 1}`}>Previous page</Link>
      ) : (
        <></>
      )}
      <GameGrid>
        {results.map((game: any) => {
          const { name, slug, background_image: image } = game
          return (
            <Game key={slug}>
              <p>{name}</p>
              <Image
                src={image}
                alt={`${name} screenshot`}
                height={360}
                width={640}
                onClick={() => router.push(`/game/${slug}`)}
              />
            </Game>
          )
        })}
      </GameGrid>
    </main>
  )
}

// export async function getStaticPaths() {
//   let paths = []
//   let pages
//   // INFO: Current limit of pages is 42281 as of 12/28/22.

//   const howmany = 845654 / 20
//   pages = Math.ceil(howmany / 1) * 1
//   for (var i = 0; i < pages; i++) {
//     paths.push({
//       params: { id: `${i + 1}` },
//     })
//   }

//   console.log(pages)

//   return {
//     paths,
//     fallback: true,
//   }
// }

export async function getServerSideProps({ params }: any) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${params.id}`
  )
  const data = await res.json()
  console.log(data)

  return {
    props: {
      data,
    },
  }
}

// export async function getStaticProps({ params }: any) {
//   const res = await fetch(
//     `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${params.id}`
//   )
//   const data = await res.json()
//   console.log(data)

//   return {
//     props: {
//       data,
//     },
//   }
// }
