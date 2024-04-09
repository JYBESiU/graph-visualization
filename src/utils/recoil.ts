import { atom } from "recoil";

import { EdgeLabel, NodeLabel } from "./types";

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
  default: "0.1",
});

export const selectedNodeLabelsState = atom<NodeLabel[]>({
  key: "selectedNodeLabels",
  default: Object.values(NodeLabel),
});

export const selectedEdgeLabelsState = atom<EdgeLabel[]>({
  key: "selectedEdgeLabels",
  default: Object.values(EdgeLabel),
});

export const viewState = atom<string>({
  key: "viewState",
  default: "graph",
});
