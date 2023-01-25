import { useState } from "react";
import "./App.css";
import Chooser from "./components/Chooser";
import Roller from "./components/Roller";
import { useWakeLock } from "react-screen-wake-lock";
import { Choice, State } from "./utils";

function App() {
  const [state, setState] = useState<State>(State.Choose);
  const [chioce, setChioce] = useState<Choice>(Choice.Eye);
  const { request } = useWakeLock({
    onError: () => alert("Screen Wake Lock: error!"),
    onRelease: () => alert("Screen Wake Lock: released!"),
  });
  request();

  return (
    <div className="app">
      {state === State.Choose ? (
        <Chooser setState={setState} setChoice={setChioce} />
      ) : (
        <Roller setState={setState} choice={chioce} />
      )}
    </div>
  );
}

export default App;
