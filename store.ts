import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

interface SavedGame {
  id: number
  slug: string
  name: string
  background_image: string
  rating: number
}

interface SavedGamesSliceState {
  savedGames: SavedGame[]
}

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
    return ''
  }
  return localStorage.getItem(key)
}

const setToLocalStorage = (key: string, value: any) => {
  if (!key || typeof window === 'undefined') {
    return ''
  }
  return localStorage.setItem(key, JSON.stringify(value))
}

const initialState: SavedGamesSliceState = {
  savedGames: getFromLocalStorage('savedGames')
    ? JSON.parse(getFromLocalStorage('savedGames') || '{}')
    : [],
}

export const savedGamesSlice = createSlice({
  name: 'savedGames',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<any>) => {
      state.savedGames = [...state.savedGames, action.payload]
      setToLocalStorage('savedGames', state.savedGames)
    },

    removeGame: (state, action: PayloadAction<string>) => {
      state.savedGames = state.savedGames.filter(
        (game) => game.name !== action.payload
      )

      setToLocalStorage('savedGames', state.savedGames)
    },
  },
})

export const { addGame, removeGame } = savedGamesSlice.actions

const store = configureStore({
  reducer: {
    savedGames: savedGamesSlice.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export const selectSavedGames = (state: RootState) =>
  state.savedGames.savedGames

export default store
