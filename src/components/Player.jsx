import { useState } from "react";

// This is the component responsible for creating players.
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  //   useState hook for handling the player name and updating it anytime it is editted by the player
  const [playerName, setPlayerName] = useState(initialName);
  // useState hook to manage the edit button in the user component such that it allows the user to edit and save the player name.
  const [isEditting, setIsEditting] = useState(false);

  //   function to handle the edit button click
  function handleEditClick() {
    setIsEditting((editing) => !editing);
    
    if (isEditting) {
      onChangeName(symbol, playerName);
    }
  }

  //   function to handle change on the input field when player name is being editted
  function handleChange(event) {
    // gets the value on the target which triggred the event and update it as the new state
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";
  //   checks to see the value of isEditting, if true, it diplays an input field if false it displays a default value.
  if (isEditting) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* Displays an input field or player name conditionally when the edit button is selected or not */}
        {editablePlayerName}
      </span>
      <span className="player-symbol">{symbol}</span>
      {/* The edit button is for editting and setting the player name */}
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
