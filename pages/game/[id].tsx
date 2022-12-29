import Image from 'next/image'
import styled from 'styled-components'
const defaultEndpoint = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=1`

const Game = styled.div`
  display: flex;
  margin: auto;
  margin-top: 1rem;
  border: 2px solid #777;
  padding: 1rem;
  border-radius: 12px;
  flex-direction: column;
  width: 75%;

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

export default function GamePageDetails({ data }: any) {
  if (!data) {
    return <h1>Loading</h1>
  }

  const { name, background_image: image } = data

  return (
    <Game>
      <p>{name}</p>
      <Image src={image} alt={`${name} screenshot`} height={360} width={640} />
    </Game>
  )
}

// export async function getStaticPaths() {
//   const res = await fetch(defaultEndpoint)
//   const data = await res.json()
//   const { results } = data

//   const paths = results.map((game: any) => {
//     return { params: { id: game.slug.toString() } }
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getServerSideProps({ params }: any) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${process.env.API_KEY}`
  )
  const data = await res.json()

  console.log(data)

  return {
    props: {
      data,
    },
  }
}
