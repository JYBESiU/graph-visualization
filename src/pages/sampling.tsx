import {
  Box,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { ReactFlowProvider } from "reactflow";

import {
  SideBar,
  ZoomControl,
  TableView,
} from "@/components";
import { viewState } from "@/utils/recoil";
import {
  useGraphByLabel,
  useGraphEdgeSampling,
} from "@/hooks";

const Cytoscape = dynamic(
  () => import("@/components/Cytoscape"),
  { ssr: false }
);

export default function Sampling() {
  const { elements, isLoading } = useGraphEdgeSampling();
  // const { elements, isLoading } = useGraphByLabel();
  const view = useRecoilValue(viewState);

  return (
    <Flex w={"100%"} h={"100vh"}>
      <Box w={"100%"} h={"100%"} pos={"relative"}>
        {isLoading && (
          <Center
            pos={"absolute"}
            top={0}
            left={0}
            w={"100%"}
            h={"100%"}
            bg={"#00000029"}
            zIndex={100}
          >
            <Spinner size={"xl"} />
          </Center>
        )}

        {view === "graph" ? (
          <Cytoscape elements={elements} />
        ) : (
          <ReactFlowProvider>
            <TableView />
          </ReactFlowProvider>
        )}
      </Box>

      <Box pos={"relative"} h={"100%"}>
        <SideBar graphLoading={isLoading} />
        {view === "graph" && <ZoomControl />}
      </Box>
    </Flex>
  );
}
