import useSWR from "swr";
import { stringify } from "qs";
import { useMemo } from "react";
import { Edge } from "reactflow";
import { useRecoilValue } from "recoil";

import { selectedNodeLabelsState } from "@/utils/recoil";

export function useEdgesByNodes() {
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<Edge[]>(
    `/edges-by-nodes?${stringify({
      labels: selectedNodeLabels,
    })}`
  );

  const edges = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { edges, isLoading };
}
