import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Choice, DiceFace, getRandomDiceFace, Player, State } from "../utils";
import players from "./Players";

type IRollerProps = {
  setState: Dispatch<SetStateAction<State>>;
  choice: Choice;
  player: Player;
};

type IDieProps = {
  choice: Choice;
  result: DiceFace | null;
};

const isEqual = (choice: Choice, result: DiceFace | null) => {
  return choice === result?.slice(0, 3);
};

const Die = ({ choice, result }: IDieProps) => {
  return (
    <div
      className={`box die ${result} ${
        !isEqual(choice, result) ? "fail" : "success"
      }`}
    />
  );
};

const Roller = ({ setState, choice, player }: IRollerProps) => {
  const [results, setResults] = useState<Array<DiceFace | null>>([
    null,
    null,
    null,
  ]);
  const [round, setRound] = useState(0);
  const [end, setEnd] = useState(false);
  const [fox, setFox] = useState(false);
  const roll = () => {
    setRound(round + 1);
    if (end) {
      setState(State.Choose);
      navigator["vibrate"] && navigator.vibrate(200);
      return;
    }
    const newResults = results.map((result) => {
      return isEqual(choice, result) ? result : getRandomDiceFace();
    });
    setResults(newResults);
    const success =
      newResults.filter((result) => isEqual(choice, result)).length === 3;
    if (success || (round === 2 && !success)) {
      setEnd(true);
      if (!success) setFox(true);
      navigator["vibrate"] && navigator.vibrate([200, 100, 200]);
      return;
    }
    navigator["vibrate"] && navigator.vibrate(200);
  };
  useEffect(roll, []);
  return (
    <div
      className={`box-container ${fox ? "fox" : ""}`}
      style={{ backgroundColor: player }}
      onClick={roll}
    >
      <div className="round">{round}</div>
      <Die choice={choice} result={results[0]} />
      <Die choice={choice} result={results[1]} />
      <Die choice={choice} result={results[2]} />
    </div>
  );
};

export default Roller;
