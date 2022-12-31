import styled from 'styled-components'
import Image from 'next/image'
import Rating from './Rating'
import { Provider, useSelector, useDispatch } from 'react-redux'
import store, { selectSavedGames, removeGame, addGame } from '../store'

export const Style = styled.div`
  display: flex;
  border: 2px solid #5e548e;
  padding: 1rem;
  border-radius: 12px;
  flex-direction: column;

  transition: all 0.1s ease-in-out;

  img {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  :hover {
    box-shadow: 0 5px 15px rgb(94, 84, 142, 0.4);
  }
`

export default function Game({ name, rating, src, onClick }: any) {
  const dispatch = useDispatch()

  return (
    <Style onClick={onClick}>
      <p>{name}</p>
      <Rating rating={rating} />
      <button onClick={() => dispatch(addGame(name))}>Save game</button>

      {src ? (
        <Image src={src} alt={`${name} screenshot`} height={360} width={640} />
      ) : (
        <></>
      )}
    </Style>
  )
}
