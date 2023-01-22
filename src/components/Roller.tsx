import { Dispatch, SetStateAction, useEffect, useState } from "react";

type IRollerProps = {
  setState: Dispatch<SetStateAction<string>>;
  choice: string;
};

type IDieProps = {
  choice: string;
  result: string;
  forceFail: boolean;
};

const isEqual = (choice: string, result: string) => {
  return choice === result.slice(0, 3);
};

const Die = ({ choice, result, forceFail }: IDieProps) => {
  return (
    <div
      className={`box ${result} ${
        forceFail || !isEqual(choice, result) ? "fail" : "success"
      }`}
    />
  );
};

const Roller = ({ setState, choice }: IRollerProps) => {
  const [results, setResults] = useState(["", "", ""]);
  const [round, setRound] = useState(1);
  const [forceFail, setForceFail] = useState(false);
  const roll = () => {
    setRound(round + 1);
    if (round > 3) {
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
    if (success) {
      setRound(4);
      navigator["vibrate"] && navigator.vibrate([200, 100, 200]);
      return;
    }
    if (round === 3 && !success) {
      setForceFail(true);
      navigator["vibrate"] && navigator.vibrate([200, 100, 200]);
      return;
    }
    navigator["vibrate"] && navigator.vibrate(200);
  };
  useEffect(roll, []);
  return (
    <div className="box-container" onClick={roll}>
      <Die choice={choice} result={results[0]} forceFail={forceFail} />
      <Die choice={choice} result={results[1]} forceFail={forceFail} />
      <Die choice={choice} result={results[2]} forceFail={forceFail} />
    </div>
  );
};

export default Roller;
