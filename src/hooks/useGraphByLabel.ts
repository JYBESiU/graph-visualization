import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import { NodeLabel } from "@/utils/types";
import {
  scaleFactorState,
  selectedNodeLabelsState,
} from "@/utils/recoil";

export function useGraphByLabel() {
  const sf = useRecoilValue(scaleFactorState);
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );
  const isAll =
    selectedNodeLabels.length ===
    Object.values(NodeLabel).length;

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    isAll
      ? ""
      : `/graph?${qs.stringify({
          sf,
          labels: selectedNodeLabels,
        })}`
  );

  const partialElements = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return {
    partialElements: isAll ? null : partialElements,
    isLoading,
  };
}
