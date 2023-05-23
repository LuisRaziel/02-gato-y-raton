import { Square } from "./Square";
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
          <button onClick={resetGame}>Jugar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
