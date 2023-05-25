export const saveGameStorage = (newBoard, newTurn) => {
  // can use the local storage for save information and dont lost this when the page is refreshed
  // the information that is saving just can be string type
  window.localStorage.setItem("board", JSON.stringify(newBoard));
  window.localStorage.setItem("turn", newTurn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
