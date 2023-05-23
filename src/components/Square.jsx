// separate the square component of the main app
// for use the named arguments muest use the export in the function
export const Square = ({ children, updateBoard, index, isSelected }) => {

  const className = `square ${isSelected && "is-selected"}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
