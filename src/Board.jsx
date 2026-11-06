import { useState } from "react";
import "./App.css";

export function Board() {
  const [square, setSquare] = useState([null, null, null, null, null, null, null, null, null]);
  const [isXNext, setIsXNext] = useState(true);
  const [isWinner, setIsWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleClick = (index) => {
    if (isWinner || isDraw) {
      return;
    }

    if (square[index] !== null) {
      return;
    }

    const newSquare = [...square];
    newSquare[index] = isXNext ? "X" : "O";

    if (calculateWinner(newSquare)) {
      setIsWinner(calculateWinner(newSquare));
    }

    if (newSquare.every((sqr) => sqr !== null) && !calculateWinner(newSquare)) {
      setIsDraw(true);
    }

    setSquare(newSquare);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquare([null, null, null, null, null, null, null, null, null]);
    setIsXNext(true);
    setIsWinner(null);
    setIsDraw(false);
  };

  const calculateWinner = (newSqr) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
      if (newSqr[a] === newSqr[b] && newSqr[b] === newSqr[c] && newSqr[a] !== null) {
        return newSqr[a];
      }
    }

    return null;
  };

  const display = () => {
    if (isWinner) {
      return `Winner: ${isWinner}`;
    } else if (isDraw) {
      return "It's a Draw";
    } else {
      return `Next Player: ${isXNext ? "X" : "O"}`;
    }
  };

  return (
    <main className="board">
      <h2>Tic-Tac-Toe Game</h2>
      <h3 className="display" aria-live="polite">{display()}</h3>

      <div className="box" role="group" aria-label="Tic-Tac-Toe board">
        {square.map((sqr, index) => (
          <button
            type="button"
            key={index}
            className="square"
            onClick={() => handleClick(index)}
            disabled={Boolean(isWinner || isDraw || sqr)}
          >
            {sqr}
          </button>
        ))}
      </div>

      <button type="button" id="reset" className="reset" onClick={handleReset}>
        Reset Game
      </button>
    </main>
  );
}
