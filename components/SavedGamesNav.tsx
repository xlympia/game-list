import styled from 'styled-components'
import { LinkButtons } from './LinkButtons'
import Link from 'next/link'

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
`

export default function SavedGamesNav() {
  return (
    <Style>
      <LinkButtons>
        <Link href={'/games'}>Home</Link>
      </LinkButtons>
    </Style>
  )
}
