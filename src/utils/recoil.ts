import { atom, selector } from "recoil";
import { Node } from "reactflow";

import { NodeLabel } from "./types";

export const defaultZoomLevelState = atom<number>({
  key: "defaultZoomLevel",
  default: 0,
});

export const currentZoomLevelState = atom<number>({
  key: "currentZoomLevel",
  default: 0,
});

export const scaleFactorState = atom<string>({
  key: "scaleFactor",
  default: "1",
});

export const selectedNodeLabelsState = atom<NodeLabel[]>({
  key: "selectedNodeLabels",
  default: Object.values(NodeLabel),
});

export const viewState = atom<string>({
  key: "viewState",
  default: "graph",
});
