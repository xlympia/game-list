import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

interface SavedGame {
  id: string
}

interface SavedGamesSliceState {
  savedGames: SavedGame[]
}

const initialState: SavedGamesSliceState = {
  savedGames: [{ id: '28' }, { id: '12' }],
}

export const savedGamesSlice = createSlice({
  name: 'savedGames',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<string>) => {
      state.savedGames = [
        ...state.savedGames,
        {
          id: action.payload,
        },
      ]
    },

    removeGame: (state, action: PayloadAction<string>) => {
      state.savedGames = state.savedGames.filter(
        (game) => game.id !== action.payload
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
