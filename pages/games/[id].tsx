import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Game = styled.div`
  display: flex;
  border: 2px solid #5e548e;
  padding: 1rem;
  border-radius: 12px;
  flex-direction: column;

  transition: all 0.1s ease-in-out;

  img {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  :hover {
    box-shadow: 0 5px 15px rgb(94, 84, 142, 0.4);
  }
`

const LinkButtons = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 0.75rem;
  justify-content: center;

  a {
    text-decoration: none;
    background: #5e548e;
    padding: 0.5rem;
    border-radius: 12px;
    font-size: 30px;
    transition: all 0.1s ease-in-out;
    font-weight: bold;
  }

  a:hover {
    color: #be95c4;
    box-shadow: 0 5px 15px rgb(94, 84, 142, 0.4);
  }
`

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  text-align: center;
`

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

export async function getServerSideProps({ params }: any) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${params.id}&page_size=9`
  )
  const data = await res.json()
  // console.log(data.results)

  const results = data.results

  return {
    props: {
      results,
    },
  }
}

// !: Ugly static rendering code.

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
