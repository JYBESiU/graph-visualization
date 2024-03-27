import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import {
  scaleFactorState,
  selectedNodeLabelsState,
} from "@/utils/recoil";

export function useGraphByLabel() {
  const sf = useRecoilValue(scaleFactorState);
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    `/graph/node-sample?${qs.stringify({
      sf,
      labels: selectedNodeLabels,
    })}`
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
