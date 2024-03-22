import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import {
  scaleFactorState,
  selectedNodeLabelsState,
} from "@/utils/recoil";

export function useGraphByLabelClient() {
  const sf = useRecoilValue(scaleFactorState);
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<{
    elements: ElementDefinition[];
    clusters: string[][];
  }>(
    `/graph/client?${qs.stringify({
      sf,
      labels: selectedNodeLabels,
    })}`
  );

  const elements = data?.elements || [];
  const clusters = data?.clusters || [];

  return {
    elements,
    clusters,
    isLoading,
  };
}
