import { Dispatch, SetStateAction, useState } from "react";
import { Player, State } from "../utils";

type IPlayersProps = {
  setState: Dispatch<SetStateAction<State>>;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
};

const Players = ({ setState, setPlayers: setAppPlayers }: IPlayersProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const indices = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];
  const choose = (player: Player) => {
    navigator["vibrate"] && navigator.vibrate(200);
    if (players.includes(player)) {
      setPlayers(players.filter((p) => p !== player));
    } else {
      setPlayers([...players, player]);
    }
  };

  const play = () => {
    navigator["vibrate"] && navigator.vibrate(200);
    setAppPlayers(players);
    if (!players.length) return;
    setState(State.Choose);
  };

  return (
    <div className="box-container">
      {Object.values(Player).map((player) => (
        <div
          key={player}
          className={`box player`}
          style={{ backgroundColor: player }}
          onClick={() => {
            choose(player);
          }}
        >
          {players.includes(player) ? indices[players.indexOf(player)] : ""}
        </div>
      ))}
      <div className={`box player`} onClick={play}>
        ▶︎
      </div>
    </div>
  );
};

export default Players;
