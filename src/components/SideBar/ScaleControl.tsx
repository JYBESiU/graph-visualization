import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { scaleFactorState } from "@/utils/recoil";

export interface ScaleControlProps {}

function ScaleControl({}: ScaleControlProps) {
  const [scale, setScale] = useRecoilState(
    scaleFactorState
  );

  return (
    <Box>
      <Text fontSize={"18px"} fontWeight={500} mb={"8px"}>
        Scale
      </Text>
      <RadioGroup onChange={setScale} value={scale}>
        <Flex direction={"column"} gap={"4px"}>
          <Radio value="1">Small</Radio>
          <Radio value="10">Medium</Radio>
          <Radio value="100">Large</Radio>
        </Flex>
      </RadioGroup>
    </Box>
  );
}

export default ScaleControl;
