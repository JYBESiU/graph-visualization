import { Flex } from "@chakra-ui/react";

import { color } from "@/utils/color";
import ScaleControl from "../ScaleControl";
import NodeControl from "./NodeControl";
import ViewControl from "../ViewControl";
import EdgeControl from "./EdgeControl";

export interface SideBarProps {
  graphLoading: boolean;
}

function SideBar({ graphLoading }: SideBarProps) {
  return (
    <Flex
      h={"100%"}
      w={260}
      p={"24px"}
      direction={"column"}
      gap={"24px"}
      borderLeftRadius={4}
      bg={color.gray100}
      overflow={"auto"}
    >
      <ViewControl />
      <ScaleControl />
      <NodeControl graphLoading={graphLoading} />
      <EdgeControl graphLoading={graphLoading} />
    </Flex>
  );
}

export default SideBar;
