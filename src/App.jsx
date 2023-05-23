import { useState } from "react";
import { Square } from "./components/Square";
import confetti from "canvas-confetti";
import { TURNS } from "../constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    // se crea un nuevo arreglo porque el estado no se debe mutar al igual que las props
    const newBoard = [...board];
    newBoard[index] = turn;
    // al mutar el estado directamente se pueden terner discrepancias en el renderizado
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // se revisa si hay un ganadador para que el juego no continue
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      // la actualizacion de los estados son ascincronos de forma que no detienen la ejecución de siguiente codigo
      setWinner(newWinner);
      confetti();
    }
    // se revisa si el juego termino
    else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
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
        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </section>
    </main>
  );
}

export default App;
