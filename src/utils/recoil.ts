import { atom } from "recoil";

export const defaultZoomLevelState = atom<number>({
  key: "defaultZoomLevelState",
  default: 0,
});

export const currentZoomLevelState = atom<number>({
  key: "currentZoomLevelState",
  default: 0,
});

export const scaleFactorState = atom<string>({
  key: "scaleFactorState",
  default: "1",
});
