import useSWR from "swr";
import { stringify } from "qs";
import { Edge, Node } from "reactflow";
import { useRecoilValue } from "recoil";

import { selectedNodeLabelsState } from "@/utils/recoil";

export function useTableSchema() {
  const selectedNodeLabels = useRecoilValue(
    selectedNodeLabelsState
  );

  const { data, isLoading } = useSWR<{
    nodeSchema: Node[];
    edgeSchema: Edge[];
  }>(
    `/table-schema?${stringify({
      nodeLabels: selectedNodeLabels,
    })}`
  );

  return {
    nodeSchema: data?.nodeSchema,
    edgeSchema: data?.edgeSchema,
    isLoading,
  };
}
