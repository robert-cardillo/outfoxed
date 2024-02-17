import { Dispatch, SetStateAction } from "react";
import { Choice, DiceFace, Player, State } from "../utils";

type IChooserProps = {
  setState: Dispatch<SetStateAction<State>>;
  setChoice: Dispatch<SetStateAction<Choice>>;
  player: Player;
};

const Chooser = ({ setState, setChoice, player }: IChooserProps) => {
  const choose = (choice: Choice) => {
    navigator["vibrate"] && navigator.vibrate(200);
    setChoice(choice);
    setState(State.Roll);
  };

  return (
    <div className="box-container" style={{ backgroundColor: player }}>
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
