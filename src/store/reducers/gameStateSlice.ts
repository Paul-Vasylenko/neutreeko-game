import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TGameState = "start" | "going" | "blackWin" | "whiteWin" | "draw";
export type TDifficulty = 1 | 2 | 3 | 4;
interface IGameState {
  state: TGameState;
  difficulty: TDifficulty;
}

const initialState: IGameState = {
  state: "start",
  difficulty: 1,
};

export const GameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setResultOfGame: (state, action: PayloadAction<TGameState>) => {
      state.state = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<TDifficulty>) => {
      state.difficulty = action.payload;
    },
    restart: (state) => {
      state.state = "start";
    },
  },
});

export default GameStateSlice.reducer;
