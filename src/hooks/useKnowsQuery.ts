import qs from "qs";
import useSWR from "swr";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ElementDefinition } from "cytoscape";

import {
  viewState,
  scaleFactorState,
  preDefinedQueryState,
} from "@/utils/recoil";

export function usePreDefinedQuery() {
  const view = useRecoilValue(viewState);
  const sf = useRecoilValue(scaleFactorState);
  const query = useRecoilValue(preDefinedQueryState);

  const { data, isLoading } = useSWR<ElementDefinition[]>(
    view === "graph" && query !== ""
      ? `/graph/preDefinedQuery?${qs.stringify({
          sf,
          query,
        })}`
      : null
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
