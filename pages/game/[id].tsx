import Game from '../../components/Game'

export default function GamePageDetails({ data }: any) {
  if (!data) {
    return <h1>Loading</h1>
  }

  const { name, background_image: image, rating } = data

  return <Game src={image} name={name} rating={rating} />
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
