import useSWR from "swr";
import { stringify } from "qs";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { EdgeLabel } from "@/utils/types";
import { selectedNodeLabelsState } from "@/utils/recoil";

export function useEdgeTypes() {
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<
    { label: EdgeLabel; color: string }[]
  >(
    `/edge-types?${stringify({
      nodeLabels: selectedNodeLabels,
    })}`
  );

  const edgeTypes = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { edgeTypes, isLoading };
}
