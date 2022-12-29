import styled from 'styled-components'
import { LinkButtons } from './LinkButtons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Search from './Search'

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
  const id = router.query.id as string

  return (
    <Style>
      <Search />
      <LinkButtons>
        {parseInt(id) - 1 > 0 ? (
          <Link href={`/games/${parseInt(id) - 1}`}>&larr;</Link>
        ) : (
          <></>
        )}
        <Link href={`/games/${parseInt(id) + 1}`}>&rarr;</Link>
      </LinkButtons>
    </Style>
  )
}
