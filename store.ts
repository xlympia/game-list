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

const initialState: SavedGamesSliceState = {
  savedGames: [],
}

export const savedGamesSlice = createSlice({
  name: 'savedGames',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<any>) => {
      state.savedGames = [...state.savedGames, action.payload]
    },

    removeGame: (state, action: PayloadAction<string>) => {
      state.savedGames = state.savedGames.filter(
        (game) => game.name !== action.payload
      )
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
