import { atom } from "recoil";

export const defaultZoomLavelState = atom<number>({
  key: "defaultZoomLavelState",
  default: 0,
});

export const currentZoomLavelState = atom<number>({
  key: "currentZoomLavelState",
  default: 0,
});

export const scaleFactorState = atom<string>({
  key: "scaleFactorState",
  default: "1",
});
