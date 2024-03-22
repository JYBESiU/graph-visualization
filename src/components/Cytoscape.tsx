import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import cytoscape, {
  Core,
  ElementDefinition,
} from "cytoscape";

import style from "@/utils/cy-style.json";
import {
  defaultZoomLevelState,
  currentZoomLevelState,
} from "@/utils/recoil";
import { Box } from "@chakra-ui/react";

export interface CytoscapeProps {
  elements: ElementDefinition[];
}

function Cytoscape({ elements }: CytoscapeProps) {
  const cyRef = useRef<Core>();
  const [defaultZoomLevel, setDefaultZoomLevel] =
    useRecoilState(defaultZoomLevelState);
  const [currentZoomLevel, setCurrentZoomLevel] =
    useRecoilState(currentZoomLevelState);

  const resetFocus = (cy?: Core) => {
    cy?.center();
    cy?.fit(undefined, 20);
    setDefaultZoomLevel(cy?.zoom() || 0);
    setCurrentZoomLevel(cy?.zoom() || 0);
  };

  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById("cy"),
      // @ts-ignore
      style,
      layout: {
        name: "preset",
      },
    });

    cyRef.current = cy;
  }, []);

  useEffect(() => {
    if (elements && elements.length > 0) {
      cyRef.current?.json({ elements });
      resetFocus(cyRef.current);
    }
  }, [elements]);

  useEffect(() => {
    cyRef.current?.zoom(currentZoomLevel);
    if (currentZoomLevel === defaultZoomLevel) {
      cyRef.current?.center();
      cyRef.current?.fit(undefined, 10);
    }
  }, [currentZoomLevel, defaultZoomLevel]);

  return <Box w={"100%"} h={"100%"} id={"cy"} />;
}

export default Cytoscape;
