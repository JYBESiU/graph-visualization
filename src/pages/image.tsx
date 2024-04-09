import {
  Box,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRecoilValue } from "recoil";

import {
  SideBar,
  ZoomControl,
  TableView,
} from "@/components";
import { useGraphImageByLabel } from "@/hooks";
import { viewState } from "@/utils/recoil";

const Cytoscape = dynamic(
  () => import("@/components/Cytoscape"),
  { ssr: false }
);

export default function ImagePage() {
  const view = useRecoilValue(viewState);

  const { imgUrl, isLoading } = useGraphImageByLabel();

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
          <Box w={"100%"} h={"100%"}>
            <Image
              alt={"graph"}
              src={imgUrl || ""}
              width={1280}
              height={720}
            />
          </Box>
        ) : (
          <TableView />
        )}
      </Box>

      <Box pos={"relative"} h={"100%"}>
        <SideBar graphLoading={isLoading} />
        {view === "graph" && <ZoomControl />}
      </Box>
    </Flex>
  );
}
