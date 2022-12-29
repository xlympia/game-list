import Image from 'next/image'
const defaultEndpoint = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=1`

export default function GamePageDetails({ data }: any) {
  if (!data) {
    return <h1>Loading</h1>
  }

  const { name, background_image: image } = data

  return (
    <div>
      <p>{name}</p>
      <Image src={image} alt={`${name} screenshot`} height={360} width={640} />
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  console.log(data)

  const paths = data.results.map((game: any) => {
    return { params: { id: game.id.toString() } }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
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
