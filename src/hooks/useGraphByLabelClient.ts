import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import {
  scaleFactorState,
  selectedEdgeLabelsState,
  selectedNodeLabelsState,
} from "@/utils/recoil";

export function useGraphByLabelClient() {
  const sf = useRecoilValue(scaleFactorState);

  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );
  const selectedEdgeLabels = useRecoilValue(
    selectedEdgeLabelsState
  );

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    `/graph/client?${qs.stringify({
      sf,
      nodeLabels: selectedNodeLabels,
      edgeLabels: selectedEdgeLabels,
    })}`
  );
  const elements = useMemo(() => {
    if (data === undefined)
      return [] as ElementDefinition[];
    return data;
  }, [data]);

  return {
    elements,

    isLoading,
  };
}
