import GameGrid from '../../components/GameGrid'
import SavedGamesNav from '../../components/SavedGamesNav'
import { useSelector, useDispatch } from 'react-redux'
import { selectSavedGames, removeGame } from '../store'
import { useState } from 'react'

export default function SavedGames() {
  const games = useSelector(selectSavedGames)
  const [data, setData] = useState(getSavedGames(games))

  return (
    <main>
      <SavedGamesNav />
      <GameGrid results={data} />
    </main>
  )
}

function getSavedGames(games: any[]) {
  let gameData: any[] = []

  games.forEach((game: any) => {
    fetch(`/api/searchForGame?id=${game.id}`)
      .then((data) => data.json())
      .then((data) => gameData.push(data))
  })

  return gameData
}
