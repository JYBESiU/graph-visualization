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

export function useGraphByLabel() {
  const view = useRecoilValue(viewState);
  const sf = useRecoilValue(scaleFactorState);
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    view === "graph"
      ? `/graph/edge-sample?${qs.stringify({
          sf,
          labels: selectedNodeLabels,
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
