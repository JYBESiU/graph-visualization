import {
  Box,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

import {
  ZoomControl,
  TableView,
  QuerySideBar,
} from "@/components";
import { viewState } from "@/utils/recoil";
import { usePreDefinedQueryClient } from "@/hooks";

const CytoscapeClient = dynamic(
  () => import("@/components/CytoscapeClient"),
  { ssr: false }
);

export default function Client() {
  const { elements, isLoading } =
    usePreDefinedQueryClient();

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
          <CytoscapeClient elements={elements} />
        ) : (
          <TableView />
        )}
      </Box>

      <Box pos={"relative"} h={"100%"}>
        <QuerySideBar graphLoading={isLoading} />
        {view === "graph" && <ZoomControl />}
      </Box>
    </Flex>
  );
}
