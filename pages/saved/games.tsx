import GameGrid from '../../components/GameGrid'
import SavedGamesNav from '../../components/SavedGamesNav'
import { useSelector } from 'react-redux'
import { selectSavedGames } from '../../store'

export default function SavedGames() {
  const games = useSelector(selectSavedGames)

  return (
    <main>
      <SavedGamesNav />
      <GameGrid results={games} />
    </main>
  )
}
