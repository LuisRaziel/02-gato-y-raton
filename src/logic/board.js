import { WINNER_COMBOS } from "../../constants";

export const checkWinnerFrom = (boarToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boarToCheck[a] &&
      boarToCheck[a] === boarToCheck[b] &&
      boarToCheck[a] === boarToCheck[c]
    ) {
      return boarToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (endBoard) => {
    return endBoard.every((square) => square !== null);
  };
