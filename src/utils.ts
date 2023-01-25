export enum State {
  Choose = "choose",
  Roll = "roll",
}

export enum Choice {
  Eye = "eye",
  Paw = "paw",
}

export enum DiceFace {
  Eye = "eye",
  Paw = "paw",
  Paw2 = "paw2",
}

export const getRandomDiceFace = () => {
  return [
    DiceFace.Eye,
    DiceFace.Eye,
    DiceFace.Eye,
    DiceFace.Paw,
    DiceFace.Paw,
    DiceFace.Paw2,
  ][Math.floor(Math.random() * 6)];
};
