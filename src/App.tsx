import React, { useEffect, useState } from "react";
import "./App.css";
import Players from "./components/Players";
import Chooser from "./components/Chooser";
import Roller from "./components/Roller";
import { useWakeLock } from "react-screen-wake-lock";
import { Choice, Player, State } from "./utils";

function App() {
  const [state, setState] = useState<State>(State.Players);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerIndex, setPlayerIndex] = useState(-1);
  const [chioce, setChioce] = useState<Choice>(Choice.Eye);
  const { request } = useWakeLock({
    onError: () => console.log("Screen Wake Lock: error!"),
    onRelease: () => console.log("Screen Wake Lock: released!"),
  });
  request();

  useEffect(() => {
    if (state === State.Choose) {
      setPlayerIndex((playerIndex + 1) % players.length);
    }
  }, [state]);

  const states = {
    [State.Players]: <Players setState={setState} setPlayers={setPlayers} />,
    [State.Choose]: (
      <Chooser
        setState={setState}
        setChoice={setChioce}
        player={players[playerIndex]}
      />
    ),
    [State.Roll]: (
      <Roller
        setState={setState}
        choice={chioce}
        player={players[playerIndex]}
      />
    ),
  };

  return <div className="app">{states[state]}</div>;
}

export default App;
