import { useRecoilValue } from "recoil";

import { scaleFactorState } from "@/utils/recoil";
import useSWR from "swr";

export function useGraphAll() {
  const sf = useRecoilValue(scaleFactorState);

  useSWR("/graph-all");
  return;
}
