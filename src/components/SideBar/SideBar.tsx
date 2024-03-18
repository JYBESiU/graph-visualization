import { Box, Text } from "@chakra-ui/react";

import { color } from "@/utils/color";
import ScaleControl from "./ScaleControl";

export interface SideBarProps {}

function SideBar({}: SideBarProps) {
  return (
    <Box
      h={"100%"}
      w={260}
      p={"24px"}
      borderLeftRadius={4}
      bg={color.gray100}
    >
      <ScaleControl />
    </Box>
  );
}

export default SideBar;
