import { useRouter } from 'next/router'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

const Style = styled.div`
  form {
    display: flex;
    gap: 10px;
  }

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
  background: #5e548e;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: scroll;
  padding: 0.5rem;
  gap: 6px;
  width: 15.8rem;
  height: 15rem;
  position: fixed;
  top: 3rem;
`
const fetcher = async (arg: any, ...args: any) =>
  await fetch(arg, ...args).then((res) => res.json())

export function Suggestions({ games }: any) {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  function requestGamePage(name: string) {
    router.push(`/game/${name}`)
  }

  useEffect(() => {
    document.addEventListener('click', () => setOpen(false))

    return () => {
      document.removeEventListener('click', () => setOpen(false))
    }
  }, [])

  return open ? (
    <SuggestionsStyle onClick={(event) => event.stopPropagation()}>
      {games.map((game: any) => (
        <button type="submit" onClick={() => requestGamePage(game.slug)}>
          {game.name}
        </button>
      ))}
    </SuggestionsStyle>
  ) : (
    <></>
  )
}
export default function Search({ results }: any) {
  const [search, setSearch] = useState('')
  const { data: suggestions, error } = useSWR(
    `/api/search?id=${search}`,
    fetcher
  )
  const router = useRouter()

  function requestSearch(e: any) {
    e.preventDefault()

    if (search) {
      router.push(`/search/${encodeURI(search.replace(/\s+/g, '-'))}`)
    }
  }

  return (
    <Style>
      <form onSubmit={requestSearch}>
        <input
          type="text"
          placeholder="Red Dead Redemption 2"
          onChange={(e) => setSearch(e.target.value)}
          onClick={(event) => event.stopPropagation()}
        />
        <button type="submit" onSubmit={requestSearch}>
          Search
        </button>
      </form>

      {suggestions && search ? <Suggestions games={suggestions} /> : <></>}
    </Style>
  )
}
