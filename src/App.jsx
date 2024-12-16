import { useState } from "react";

import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

// initiates an empty gameboard using a nested array for both rows and columns
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  // deriving the current player for the current gameTurn
  let currentPlayer = "X";
  // to help dynamically assign a player turn based on the current player symbol
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

// a function to derive the gameBoard
function deriveGameBoard(gameTurns) {
  // deriving the gameboard from the gameTurns state in the app component.
  const gameBoard = [...INITIAL_GAME_BOARD.map((innerRows) => [...innerRows])];

  // iterates through each game turn on the gameturns array and populate each row and column with the appropriate associated player symbol
  for (const turn of gameTurns) {
    // distructures the gameTurns array to get the square's row and columns and the respective players who selected the squares
    const { square, player } = turn;
    const { row, col } = square;

    // assigns each square with the appropriate player symbol for all the selected squares on the gameboard.
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

// A function to derive game winner.
function deriveWinner(gameBoard, players) {
  let winner;

  // checking if a winning combination has been created
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // checks to see if the 3 square symbols are equal to declare the player as the winner
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWInner, setHasWinner] = useState(false);

  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  // dericing gameboard from the deriveGameBoard function
  const gameBoard = deriveGameBoard(gameTurns);
  // calling the derive winner function to check game winner.
  const winner = deriveWinner(gameBoard, players);
  // checks for a draw if all gameTurns are exhausted and there has been no winning combination.
  const hasDraw = gameTurns.length === 9 && !winner;

  // function that updates the active player based off the current player
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      // creates an array of objects that contains the details of the of the squared clicked and the symbol of the player who clicked the square.
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handleSetPlayer(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleSetPlayer}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleSetPlayer}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
