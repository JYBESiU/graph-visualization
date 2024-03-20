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
  const { elements, isLoading } = useGraphAll();
  const { partialElements, isLoading: ld } =
    useGraphByLabel();

  return (
    <Flex w={"100%"} h={"100vh"}>
      {isLoading ? (
        <Center w={"100%"} h={"100%"}>
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <Cytoscape
          elements={elements}
          partialElements={partialElements}
        />
      )}
      <Box pos={"relative"} h={"100%"}>
        <SideBar />
        <ZoomControl />
      </Box>
    </Flex>
  );
}
