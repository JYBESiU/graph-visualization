import { Flex } from "@chakra-ui/react";

import { color } from "@/utils/color";
import ScaleControl from "../ScaleControl";
import ViewControl from "../ViewControl";
import QueryControl from "./QueryControl";

export interface QuerySideBarProps {
  graphLoading: boolean;
}

function QuerySideBar({ graphLoading }: QuerySideBarProps) {
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
      <QueryControl />
    </Flex>
  );
}

export default QuerySideBar;
