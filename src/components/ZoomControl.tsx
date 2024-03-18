import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  defaultZoomLavelState,
  currentZoomLavelState,
} from "@/utils/recoil";
import { color } from "@/utils/color";
import { FaMinus, FaPlus } from "react-icons/fa6";

export interface ZoomControlProps {}

function ZoomControl({}: ZoomControlProps) {
  const defaultZoomLevel = useRecoilValue(
    defaultZoomLavelState
  );
  const zoomGap = defaultZoomLevel * 0.3;
  const setCurrentZoomLevel = useSetRecoilState(
    currentZoomLavelState
  );

  const handleZoomIn = () => {
    setCurrentZoomLevel((prev) => prev + zoomGap);
  };

  const handleZoomOut = () => {
    setCurrentZoomLevel((prev) => prev - zoomGap);
  };

  return (
    <Root>
      <ButtonUp onClick={handleZoomIn}>
        <FaPlus />
      </ButtonUp>
      <Slider></Slider>
      <ButtonDown onClick={handleZoomOut}>
        <FaMinus />
      </ButtonDown>
    </Root>
  );
}

export default ZoomControl;

const Root = styled.div`
  position: absolute;
  left: -80px;
  bottom: 36px;

  display: flex;
  flex-direction: column;

  border: 1px solid ${color.gray300};
  border-radius: 4px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.05),
    0px 1px 2px 0px rgba(0, 0, 0, 0.15);
`;

const Button = styled.div`
  width: 44px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonUp = styled(Button)`
  border-bottom: 1px solid ${color.gray300};
`;
const ButtonDown = styled(Button)`
  border-top: 1px solid ${color.gray300};
`;
const Slider = styled.div`
  width: 44px;
  height: 100px;
`;
