import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR, { Key, Fetcher } from 'swr'

const Style = styled.div`
  display: flex;
  gap: 10px;

  input,
  button {
    padding: 0.5rem;
    border: 0;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 8px;
    color: #5e548e;
  }
`

const SuggestionsStyle = styled.div`
  position: fixed;
  top: 3rem;
  color: red;
`
const fetcher = async (arg: any, ...args: any) =>
  await fetch(arg, ...args).then((res) => res.json())

export function Suggestions({ games }: any) {
  return (
    <SuggestionsStyle>
      {games.map((game: any) => (
        <p>{game}</p>
      ))}
    </SuggestionsStyle>
  )
}
export default function Search({ results }: any) {
  const [search, setSearch] = useState('')
  //   const { data: suggestions, error } = useSWR(
  //     `/api/search?id=${search}`,
  //     fetcher
  //   )

  //   console.log(suggestions)

  const router = useRouter()

  function requestSearch() {
    if (search) {
      router.push(`/search/${encodeURI(search.replace(/\s+/g, '-'))}`)
    }
  }

  return (
    <Style>
      <input
        type="text"
        placeholder="Red Dead Redemption 2"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={requestSearch}>Search</button>

      {/* {suggestions ? <Suggestions games={suggestions} /> : <></>} */}
    </Style>
  )
}

// export async function getServerSideProps({ params }: any) {
//   const res = await fetch(
//     `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${params.id}&page_size=9`
//   )
//   const data = await res.json()
//   console.log(data.results)

//   return {
//     props: {
//       data,
//     },
//   }
// }
