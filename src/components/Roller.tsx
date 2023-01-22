import { Dispatch, SetStateAction, useEffect, useState } from "react";

type IRollerProps = {
  setState: Dispatch<SetStateAction<string>>;
  choice: string;
};

type IDieProps = {
  choice: string;
  result: string;
};

const isEqual = (choice: string, result: string) => {
  return choice === result.slice(0, 3);
};

const Die = ({ choice, result }: IDieProps) => {
  return (
    <div
      className={`box ${result} ${
        !isEqual(choice, result) ? "fail" : "success"
      }`}
    />
  );
};

const Roller = ({ setState, choice }: IRollerProps) => {
  const [results, setResults] = useState(["", "", ""]);
  const [round, setRound] = useState(0);
  const [end, setEnd] = useState(false);
  const roll = () => {
    setRound(round + 1);
    if (end) {
      setState("choose");
      navigator["vibrate"] && navigator.vibrate(200);
      return;
    }
    const newResults = results.map((result) => {
      return isEqual(choice, result)
        ? result
        : ["eye", "eye", "eye", "paw", "paw", "paw2"][
            Math.floor(Math.random() * 6)
          ];
    });
    setResults(newResults);
    const success =
      newResults.filter((result) => isEqual(choice, result)).length === 3;
    if (success || (round === 2 && !success)) {
      setEnd(true);
      navigator["vibrate"] && navigator.vibrate([200, 100, 200]);
      return;
    }
    navigator["vibrate"] && navigator.vibrate(200);
  };
  useEffect(roll, []);
  return (
    <div className="box-container" onClick={roll}>
      <div className="round">{round}</div>
      <Die choice={choice} result={results[0]} />
      <Die choice={choice} result={results[1]} />
      <Die choice={choice} result={results[2]} />
    </div>
  );
};

export default Roller;
