import dynamic from "next/dynamic";
import { Box, Flex } from "@chakra-ui/react";

import data from "@/utils/data.json";
import { SideBar, ZoomControl } from "@/components";
import { useNodeByLabel } from "@/hooks";

const Cytoscape = dynamic(
  () => import("@/components/Cytoscape"),
  { ssr: false }
);

export default function Home() {
  const { nodes } = useNodeByLabel();

  return (
    <Flex w={"100%"} h={"100vh"}>
      <Cytoscape data={nodes} />
      <Box flexShrink={0} pos={"relative"} h={"100%"}>
        <SideBar />
        <ZoomControl />
      </Box>
    </Flex>
  );
}
