import styled from 'styled-components'
import { LinkButtons } from './LinkButtons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Search from './Search'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Style = styled.div`
  position: sticky;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    display: flex;
  }

  .savedGames {
    font-size: 1.2rem;
  }
`

export default function Nav() {
  const router = useRouter()
  let id = router.query.id as string

  if (isNaN(parseInt(id))) {
    id = '0'
  }

  return (
    <Style>
      <Search />
      <LinkButtons>
        {parseInt(id) - 1 > 0 ? (
          <Link href={`/games/${parseInt(id) - 1}`}>
            <FaArrowLeft />
          </Link>
        ) : (
          <></>
        )}
        <Link href={`/games/${parseInt(id) + 1}`}>
          <FaArrowRight />
        </Link>
        <Link className="savedGames" href={`/saved/games`}>
          Saved
        </Link>
      </LinkButtons>
    </Style>
  )
}
