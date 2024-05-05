import { atom, selector } from "recoil";

import { EdgeLabel, NodeLabel } from "./types";
import { getEdgeLablesByNodeLabels } from "./labels";
import { edgeColors } from "./color";

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

export const preDefinedQueryState = atom<string>({
  key: "preDefinedQuery",
  default: "",
});

export const selectedNodeLabelsState = atom<NodeLabel[]>({
  key: "selectedNodeLabels",
  default: Object.values(NodeLabel),
});

export const selectedEdgeLabelsState = atom<EdgeLabel[]>({
  key: "selectedEdgeLabels",
  default: Object.values(EdgeLabel),
});

export const edgeTypesState = selector<
  {
    label: EdgeLabel;
    color: string;
  }[]
>({
  key: "edgeTypes",
  get: ({ get }) => {
    const nodeLabels = get(selectedNodeLabelsState);

    const edgeLabels =
      getEdgeLablesByNodeLabels(nodeLabels);
    const edgeTypes = edgeLabels.map((label) => ({
      label,
      color: edgeColors[label],
    }));

    return edgeTypes;
  },
});

export const viewState = atom<string>({
  key: "viewState",
  default: "graph",
});
