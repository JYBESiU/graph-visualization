import dynamic from "next/dynamic";
import { Box, Flex } from "@chakra-ui/react";

import { SideBar, ZoomControl } from "@/components";
import { useGraphAll, useNodeByLabel } from "@/hooks";

const Cytoscape = dynamic(
  () => import("@/components/Cytoscape"),
  { ssr: false }
);

export default function Home() {
  const { elements, isLoading } = useGraphAll();

  return (
    <Flex w={"100%"} h={"100vh"}>
      {!isLoading && <Cytoscape elements={elements} />}
      <Box flexShrink={0} pos={"relative"} h={"100%"}>
        <SideBar />
        <ZoomControl />
      </Box>
    </Flex>
  );
}
