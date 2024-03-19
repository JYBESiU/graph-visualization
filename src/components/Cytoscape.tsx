import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import cytoscape, { ElementDefinition } from "cytoscape";

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
  const cyRef = useRef<cytoscape.Core>();
  const [defaultZoomLevel, setDefaultZoomLevel] =
    useRecoilState(defaultZoomLevelState);
  const [currentZoomLevel, setCurrentZoomLevel] =
    useRecoilState(currentZoomLevelState);

  useEffect(() => {
    if (elements?.length > 0) {
      const cy = cytoscape({
        container: document.getElementById("cy"),
        elements,
        // @ts-ignore
        style,
        layout: {
          name: "preset",
        },
      });

      cy.center();
      cy.fit(undefined, 10);
      setDefaultZoomLevel(cy.zoom());
      setCurrentZoomLevel(cy.zoom());

      cyRef.current = cy;
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
