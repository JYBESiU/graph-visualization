import { useMemo } from "react";
import useSWR from "swr";

export function useNodeTypes() {
  const { data, isLoading } =
    useSWR<{ name: string; color: string }[]>(
      "/node-types"
    );

  const nodeTypes = useMemo(() => {
    if (data === undefined) return [];
    return data;
  }, [data]);

  return { nodeTypes, isLoading };
}
