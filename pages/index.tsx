import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Game List</title>
        <meta name="description" content="Game List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <button onClick={() => router.push('/games/1')}>Games Page</button>
      </main>
    </>
  )
}
