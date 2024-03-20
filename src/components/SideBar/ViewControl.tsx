import { useRecoilState } from "recoil";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";

import { viewState } from "@/utils/recoil";

export interface ViewControlProps {}

function ViewControl({}: ViewControlProps) {
  const [view, setView] = useRecoilState(viewState);

  return (
    <Box>
      <Text fontSize={"18px"} fontWeight={500} mb={"8px"}>
        View
      </Text>
      <RadioGroup onChange={setView} value={view}>
        <Flex gap={"12px"}>
          <Radio value="graph">Graph</Radio>
          <Radio value="table">Table</Radio>
        </Flex>
      </RadioGroup>
    </Box>
  );
}

export default ViewControl;
