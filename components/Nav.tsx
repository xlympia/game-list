import styled from 'styled-components'
import { LinkButtons } from './LinkButtons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Search from './Search'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

const Style = styled.div`
  position: sticky;
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
            <AiOutlineArrowLeft />
          </Link>
        ) : (
          <></>
        )}
        <Link href={`/games/${parseInt(id) + 1}`}>
          <AiOutlineArrowRight />
        </Link>
      </LinkButtons>
    </Style>
  )
}
