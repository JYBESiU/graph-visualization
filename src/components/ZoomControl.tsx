import styled from "@emotion/styled";
import { BiReset } from "react-icons/bi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Box, Center, Flex } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  defaultZoomLevelState,
  currentZoomLevelState,
} from "@/utils/recoil";
import { color } from "@/utils/color";

export interface ZoomControlProps {}

function ZoomControl({}: ZoomControlProps) {
  const defaultZoomLevel = useRecoilValue(
    defaultZoomLevelState
  );
  const zoomGap = defaultZoomLevel * 0.4;
  const setCurrentZoomLevel = useSetRecoilState(
    currentZoomLevelState
  );

  const handleZoomIn = () => {
    setCurrentZoomLevel((prev) => prev + zoomGap);
  };

  const handleZoomOut = () => {
    setCurrentZoomLevel((prev) => prev - zoomGap);
  };

  const handleZoomReset = () => {
    setCurrentZoomLevel(defaultZoomLevel);
  };

  return (
    <Flex
      direction={"column"}
      pos={"absolute"}
      left={"-76px"}
      bottom={"36px"}
    >
      <Center
        w={"42px"}
        h={"42px"}
        mb={"12px"}
        cursor={"pointer"}
        borderWidth={1}
        borderStyle={"soild"}
        borderColor={color.gray300}
        borderRadius={4}
        boxShadow={
          "0px 2px 6px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.15)"
        }
        onClick={handleZoomReset}
      >
        <BiReset size={"20px"} />
      </Center>

      <Flex
        direction={"column"}
        borderWidth={1}
        borderStyle={"soild"}
        borderColor={color.gray300}
        borderRadius={4}
        boxShadow={
          "0px 2px 6px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.15)"
        }
      >
        <ButtonUp onClick={handleZoomIn}>
          <FaPlus />
        </ButtonUp>
        <Box w={"40px"} h={"100px"}></Box>
        <ButtonDown onClick={handleZoomOut}>
          <FaMinus />
        </ButtonDown>
      </Flex>
    </Flex>
  );
}

export default ZoomControl;

const Button = styled.div`
  width: 40px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ButtonUp = styled(Button)`
  border-bottom: 1px solid ${color.gray300};
`;
const ButtonDown = styled(Button)`
  border-top: 1px solid ${color.gray300};
`;
