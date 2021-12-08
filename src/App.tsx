import React from "react";
import "./App.css";
import Board from "./components/board/Board";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { BoardSlice } from "./store/reducers/boardSlice";
import { GameStateSlice, TDifficulty } from "./store/reducers/gameStateSlice";
import { MoveSlice } from "./store/reducers/moveSlice";
import { TurnSlice } from "./store/reducers/turnSlice";

function App() {
  const board = useAppSelector((store) => store.board);
  const { state: gameState, difficulty } = useAppSelector(
    (store) => store.game
  );
  const dispatch = useAppDispatch();
  const restartGame = () => {
    dispatch(BoardSlice.actions.restart());
    dispatch(GameStateSlice.actions.restart());
    dispatch(MoveSlice.actions.restart());
    dispatch(TurnSlice.actions.restart());
  };
  const concede = () => {
    dispatch(GameStateSlice.actions.setResultOfGame("whiteWin"));
  };
  return (
    <>
      <button
        onClick={() =>
          alert(`The players have three pieces each. They are placed as shown in the figure.
    Movement: A piece slides orthogonally or diagonally until stopped by
    an occupied square or the border of the board. Black always moves first.
    
    Objective: To get three in a row, orthogonally or diagonally. The row must be connected.`)
        }
      >
        Rules
      </button>
      <div className="app">
        <h1>Neutreeko</h1>
        {gameState === "start" ? (
          <>
            <p>You can choose the difficulty</p>
            <select
              onChange={(e) =>
                dispatch(
                  GameStateSlice.actions.setDifficulty(
                    +e.target.value as TDifficulty
                  )
                )
              }
              value={difficulty}
            >
              <option value={1}>Easy</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
              <option value={4}>Impossible</option>
            </select>
          </>
        ) : null}
        {gameState === "going" ? (
          <>
            {" "}
            <p>The game is hard..</p>
            <button onClick={concede}>Concede</button>
          </>
        ) : null}
        {gameState === "blackWin" ? (
          <>
            <p>Black win the game!</p>
            <button onClick={restartGame}>Restart</button>
          </>
        ) : null}
        {gameState === "whiteWin" ? (
          <>
            <p>white win the game!</p>
            <button onClick={restartGame}>Restart</button>
          </>
        ) : null}
        {gameState === "draw" ? (
          <>
            <p>Draw!</p>
            <button onClick={restartGame}>Restart</button>
          </>
        ) : null}

        <Board board={board} />
      </div>
    </>
  );
}

export default App;
