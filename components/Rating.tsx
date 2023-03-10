import styled from 'styled-components'
import { AiFillStar } from 'react-icons/ai'

const Style = styled.div`
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
`

export default function Rating({ rating }: any) {
  const stars = []

  for (let i = 0; i < Math.round(rating); i++) {
    stars.push(<AiFillStar size={25} fill={'#FFD700'} key={i} />)
  }

  return <Style>{stars}</Style>
}
