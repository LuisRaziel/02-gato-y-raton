import { WINNER_COMBOS } from "../../constants";
// can extract the logic of the app for can use this in other framework for example 

// check if there is a winner when the WINNER_COMBOS array is fulfilled 
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

// check if the array has not nulls 
export const checkEndGame = (endBoard) => {
    return endBoard.every((square) => square !== null);
  };
