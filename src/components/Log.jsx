export default function Log({ turns }) {
  return (
    <ol id="log">
    {/* maps all the turns and log them on the log component showing which player made what move on the gameboard. */}
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
