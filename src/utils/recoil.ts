import { atom } from "recoil";
import { NodeLabel } from "./types";

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

export const selectedNodeLabelsState = atom<NodeLabel[]>({
  key: "selectedNodeLabelsState",
  default: Object.values(NodeLabel),
});
