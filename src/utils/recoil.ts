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

export const selectedNodeLabelSchemaState = selector<
  Node[]
>({
  key: "selectedNodeLabelSchema",
  get: ({ get }) => {
    const selectedNodeLabels = get(selectedNodeLabelsState);

    return selectedNodeLabels.map((nodeLabel, index) => ({
      id: nodeLabel,
      position: { x: 0, y: index * 100 },
      data: { label: nodeLabel },
    }));
  },
});

export const viewState = atom<string>({
  key: "viewState",
  default: "graph",
});
