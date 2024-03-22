import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import { scaleFactorState } from "@/utils/recoil";

export function useGraphPerson() {
  const sf = useRecoilValue(scaleFactorState);

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    `/graph/person?${qs.stringify({
      sf,
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
