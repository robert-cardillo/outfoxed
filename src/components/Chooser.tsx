import { Dispatch, SetStateAction } from "react";

type IChooserProps = {
  setState: Dispatch<SetStateAction<string>>;
  setChoice: Dispatch<SetStateAction<string>>;
};

const Chooser = ({ setState, setChoice }: IChooserProps) => {
  const choose = (choice: string) => {
    navigator["vibrate"] && navigator.vibrate(500);
    setChoice(choice);
    setState("roll");
  };

  return (
    <div className="box-container">
      <div
        className="box paw"
        onClick={() => {
          choose("paw");
        }}
      />
      <div
        className="box eye"
        onClick={() => {
          choose("eye");
        }}
      />
    </div>
  );
};

export default Chooser;
