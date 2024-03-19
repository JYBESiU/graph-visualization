import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import { NodeLabel } from "@/utils/types";
import { scaleFactorState } from "@/utils/recoil";
import { useMemo } from "react";

export function useNodeByLabel(label?: NodeLabel[]) {
  const sf = useRecoilValue(scaleFactorState);

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    `/graph?sf=${sf}`
  );

  const nodes = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { nodes, isLoading };
}
