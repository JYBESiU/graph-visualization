import useSWR from "swr";
import { useMemo } from "react";

import { NodeLabel } from "@/utils/types";

export function useNodeTypes() {
  const { data, isLoading } =
    useSWR<{ label: NodeLabel; color: string }[]>(
      "/node-types"
    );

  const nodeTypes = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { nodeTypes, isLoading };
}
