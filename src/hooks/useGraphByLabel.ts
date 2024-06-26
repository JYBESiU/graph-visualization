import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import {
  scaleFactorState,
  selectedEdgeLabelsState,
  selectedNodeLabelsState,
  viewState,
} from "@/utils/recoil";
import { stringify } from "qs";

export function useGraphByLabel() {
  const view = useRecoilValue(viewState);
  const sf = useRecoilValue(scaleFactorState);
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );
  const selectedEdgeLabels = useRecoilValue(
    selectedEdgeLabelsState
  );

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    view === "graph"
      ? `/graph?${stringify({
          sf,
          nodeLabels: selectedNodeLabels,
          edgeLabels: selectedEdgeLabels,
        })}`
      : null
  );

  const elements = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { elements, isLoading };
}
