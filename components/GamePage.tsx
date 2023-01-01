import styled from 'styled-components'
import Image from 'next/image'
import Rating from './Rating'
import parse from 'html-react-parser'
import { useState } from 'react'
import Nav from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { addGame, removeGame, selectSavedGames } from '../store'

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

  .description p {
    font-weight: 500;
    text-align: center;
  }

  .description div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .description button {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .nameRating {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

// INFO: Shorten a string to less than maxLen characters without truncating words.
function shorten(str: string, maxLen: number, separator = ' ') {
  if (str.length <= maxLen) return str
  return str.substring(0, str.lastIndexOf(separator, maxLen))
}

export default function GamePage({
  name,
  rating,
  slug,
  description,
  src,
  onClick,
}: any) {
  const [expanded, setExpanded] = useState(false)
  const subDescription =
    description.length > 350 ? shorten(description, 350) + ' ...' : description

  const dispatch = useDispatch()
  const games = useSelector(selectSavedGames)
  const saved = games.find((game: any) => game.name === name) ? true : false

  return (
    <div suppressHydrationWarning>
      <Nav />
      <Style suppressHydrationWarning onClick={onClick}>
        <div className="nameRating">
          <p>{name}</p>
          <Rating rating={rating} />
        </div>
        <div className="description" suppressHydrationWarning>
          {expanded ? (
            <div>
              {parse(description)}
              {subDescription !== description ? (
                <button onClick={() => setExpanded(!expanded)}>
                  Show less
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div>
              {parse(subDescription)}
              {subDescription !== description ? (
                <button onClick={() => setExpanded(!expanded)}>
                  Show more
                </button>
              ) : (
                <></>
              )}
            </div>
          )}

          {/* <div suppressHydrationWarning className="saved">
            {saved ? (
              <button
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(removeGame(name))
                }}
              >
                Remove from saved
              </button>
            ) : (
              <button
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(
                    addGame({ name, slug, background_image: src, rating })
                  )
                }}
              >
                Save game
              </button>
            )}
          </div> */}
        </div>

        {src ? (
          <Image
            src={src}
            alt={`${name} screenshot`}
            height={360}
            width={640}
          />
        ) : (
          <></>
        )}
      </Style>
    </div>
  )
}
