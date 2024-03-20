import dynamic from "next/dynamic";
import {
  Box,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";

import { SideBar, ZoomControl } from "@/components";
import { useGraphAll, useGraphByLabel } from "@/hooks";

const Cytoscape = dynamic(
  () => import("@/components/Cytoscape"),
  { ssr: false }
);

export default function Home() {
  // const { elements, isLoading } = useGraphAll();
  const { elements, isLoading } = useGraphByLabel();

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
        <Cytoscape elements={elements} />
      </Box>

      <Box pos={"relative"} h={"100%"}>
        <SideBar graphLoading={isLoading} />
        <ZoomControl />
      </Box>
    </Flex>
  );
}
