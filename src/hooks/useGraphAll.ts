import { useRecoilValue } from "recoil";

import { scaleFactorState } from "@/utils/recoil";
import useSWR from "swr";
import { ElementDefinition } from "cytoscape";
import { useMemo } from "react";

export function useGraphAll() {
  const sf = useRecoilValue(scaleFactorState);

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    `/graph-all?sf=${sf}`
  );

  const graphs = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { graphs, isLoading };
}
