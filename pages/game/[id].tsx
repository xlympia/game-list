import Game from '../../components/Game'
import GamePage from '../../components/GamePage'

export default function GamePageDetails({ data }: any) {
  if (!data) {
    return <h1>Loading</h1>
  }

  const { name, description, background_image: image, rating } = data

  return (
    <GamePage
      src={image}
      name={name}
      rating={rating}
      description={description}
    />
  )
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${process.env.API_KEY}`
  )
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
