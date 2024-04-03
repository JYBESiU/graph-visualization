import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { NodeData, NodeLabel } from "@/utils/types";
import { scaleFactorState } from "@/utils/recoil";

export function useNodeData(label: NodeLabel) {
  const sf = useRecoilValue(scaleFactorState);

  const { data, isLoading } = useSWR<NodeData[]>(
    `/node-data?${qs.stringify({ sf, label })}`
  );

  const nodeData = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { nodeData, isLoading };
}
