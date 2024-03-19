import dynamic from "next/dynamic";
import {
  Box,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";

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
      {isLoading ? (
        <Center w={"100%"} h={"100%"}>
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <Cytoscape elements={elements} />
      )}
      <Box pos={"relative"} h={"100%"}>
        <SideBar />
        <ZoomControl />
      </Box>
    </Flex>
  );
}
