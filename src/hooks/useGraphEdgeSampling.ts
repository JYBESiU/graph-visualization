import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import {
  scaleFactorState,
  selectedNodeLabelsState,
  viewState,
} from "@/utils/recoil";

export function useGraphEdgeSampling() {
  const view = useRecoilValue(viewState);
  const sf = useRecoilValue(scaleFactorState);
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    view === "graph"
      ? `/graph/node-sample?${qs.stringify({
          sf,
          nodeLabels: selectedNodeLabels,
        })}`
      : null
  );

  const elements = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return {
    elements,
    isLoading,
  };
}
