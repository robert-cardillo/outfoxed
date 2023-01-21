import { useState } from "react";
import "./App.css";
import Chooser from "./components/Chooser";
import Roller from "./components/Roller";

function App() {
  const [state, setState] = useState("choose"); // choose | roll | fail | success
  const [chioce, setChioce] = useState(""); // paw | eye

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
