import { Dispatch, SetStateAction } from "react";
import { Choice, DiceFace, State } from "../utils";

type IChooserProps = {
  setState: Dispatch<SetStateAction<State>>;
  setChoice: Dispatch<SetStateAction<Choice>>;
};

const Chooser = ({ setState, setChoice }: IChooserProps) => {
  const choose = (choice: Choice) => {
    navigator["vibrate"] && navigator.vibrate(200);
    setChoice(choice);
    setState(State.Roll);
  };

  return (
    <div className="box-container">
      <div
        className={`box ${DiceFace.Paw}`}
        onClick={() => {
          choose(Choice.Paw);
        }}
      />
      <div
        className={`box ${DiceFace.Eye}`}
        onClick={() => {
          choose(Choice.Eye);
        }}
      />
    </div>
  );
};

export default Chooser;
