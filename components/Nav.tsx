import styled from 'styled-components'
import { LinkButtons } from './LinkButtons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Search from './Search'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Style = styled.div`
  position: sticky;
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    display: flex;
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
      </LinkButtons>
    </Style>
  )
}
