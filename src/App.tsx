import { useState } from "react";
import "./App.css";
import Chooser from "./components/Chooser";
import Roller from "./components/Roller";
import { useWakeLock } from "react-screen-wake-lock";

function App() {
  const [state, setState] = useState("choose"); // choose | roll | fail | success
  const [chioce, setChioce] = useState(""); // paw | eye
  const { isSupported, released, request, release } = useWakeLock({
    onError: () => alert("Screen Wake Lock: error!"),
    onRelease: () => alert("Screen Wake Lock: released!"),
  });
  request();

  return (
    <div className="app">
      {state === "choose" ? (
        <Chooser setState={setState} setChoice={setChioce} />
      ) : (
        <Roller setState={setState} choice={chioce} />
      )}
    </div>
  );
}

export default App;
