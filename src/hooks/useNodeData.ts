import qs from "qs";
import useSWR from "swr";
import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import useSWRInfinite from "swr/infinite";

import { NodeData, NodeLabel } from "@/utils/types";
import { scaleFactorState } from "@/utils/recoil";

const getKey =
  (query: { sf: string; label: NodeLabel }) =>
  (page: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.result.length)
      return null;

    return `/node-data?${qs.stringify({
      ...query,
      page,
      size: 50,
    })}`;
  };

export function useNodeData(label: NodeLabel) {
  const sf = useRecoilValue(scaleFactorState);

  const { data, setSize, ...rest } = useSWRInfinite<{
    result: NodeData[];
    count: number;
  }>(getKey({ sf, label }), { revalidateFirstPage: false });

  const list = useMemo(
    () => data?.flatMap((d) => d.result) || [],
    [data]
  );
  const count = data?.[0]?.count || 0;
  const isEmpty = list.length === 0;
  const isReachingEnd = isEmpty || list.length >= count;

  const loadMore = useCallback(
    () => setSize((prev) => prev + 1),
    [setSize]
  );

  return {
    nodeData: list,
    count,
    isEmpty,
    isReachingEnd,
    loadMore,
    ...rest,
  };
}
