import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import {
  scaleFactorState,
  selectedNodeLabelsState,
} from "@/utils/recoil";

export function useGraphImageByLabel() {
  const sf = useRecoilValue(scaleFactorState);
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<{ imgUrl: string }>(
    `/graph/image?${qs.stringify({
      sf,
      labels: selectedNodeLabels,
    })}`
  );

  return {
    imgUrl: data?.imgUrl,
    isLoading,
  };
}
