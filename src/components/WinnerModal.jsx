import { Square } from "./Square";

// create a modal to indicate if there is a winner 
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;
  const textWinner = !winner ? "Empate" : "Ganador";
  return (
    <section className="winner">
      <div className="text">
        <h2>{textWinner}</h2>
        {winner !== false && (
          <header className="win">{winner && <Square>{winner}</Square>}</header>
        )}
        <footer>
            {/* onClick use the fuction that was passed as a prop to the component  */}
          <button onClick={resetGame}>Jugar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
