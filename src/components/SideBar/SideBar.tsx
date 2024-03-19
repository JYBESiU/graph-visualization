import { Box, Flex, Text } from "@chakra-ui/react";

import { color } from "@/utils/color";
import ScaleControl from "./ScaleControl";
import NodeControl from "./NodeControl";

export interface SideBarProps {}

function SideBar({}: SideBarProps) {
  return (
    <Flex
      h={"100%"}
      w={260}
      p={"24px"}
      direction={"column"}
      gap={"24px"}
      borderLeftRadius={4}
      bg={color.gray100}
    >
      <ScaleControl />
      <NodeControl />
    </Flex>
  );
}

export default SideBar;
