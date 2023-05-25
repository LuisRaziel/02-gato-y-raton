import { useState } from "react";
import { Square } from "./components/Square.jsx";
import confetti from "canvas-confetti";
import { TURNS } from "../constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorage, saveGameStorage } from "./logic/storage";

function App() {
  // use states for save the change wiht thw app
  // can use the callbacks function to initialize the state with the processed information
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board");
    return boardFromLocalStorage
      ? JSON.parse(boardFromLocalStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn");
    if (turnFromLocalStorage) return turnFromLocalStorage;
    return TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    // create new array because the original array is a state and is unmutable
    const newBoard = [...board];
    newBoard[index] = turn;
    // when we mutate the state directly we could cause rendering errors
    // for avoid that  we need to create another array and asign this to the state
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameStorage(newBoard, newTurn);
    // se revisa si hay un ganadador para que el juego no continue
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      // the state update is asynchronous so the following code wil be executed non-stop
      setWinner(newWinner);
      confetti();
    }
    // check if the game is over
    else if (checkEndGame(newBoard)) {
      // if the game is over then the game finished with tie
      setWinner(false);
    }
  };

  // update all state for reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    // to remove the local storage data must manually remove these
    resetGameStorage();
  };

  return (
    <main className="board">
      <h1>El Gato y El Ratón</h1>
      <button onClick={resetGame}> Empezar de nuevo </button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section>
        {/* resetGame  is passed as a prop to the componet to use the function from there */}
        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </section>
    </main>
  );
}

export default App;
