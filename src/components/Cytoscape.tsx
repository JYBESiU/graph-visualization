import { useEffect, useRef, useState } from "react";
import cosmos, {
  CosmosCystoscapeLayoutOptions,
} from "cosmos-over-cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape, { ElementDefinition } from "cytoscape";
import { useRecoilState, useSetRecoilState } from "recoil";

import style from "@/utils/cy-style.json";
import {
  defaultZoomLevelState,
  currentZoomLevelState,
} from "@/utils/recoil";
import { Box } from "@chakra-ui/react";

export interface CytoscapeProps {
  data: ElementDefinition[];
}

cytoscape.use(cosmos);

function Cytoscape({ data }: CytoscapeProps) {
  const cyRef = useRef<cytoscape.Core>();
  const setDefaultZoomLevel = useSetRecoilState(
    defaultZoomLevelState
  );
  const [currentZoomLevel, setCurrentZoomLevel] =
    useRecoilState(currentZoomLevelState);

  useEffect(() => {
    if (data.length > 0) {
      const cy = cytoscape({
        container: document.getElementById("cy"),
        elements: data,
        style,
        layout: { name: "preset" },
      });

      cy.center();
      cy.fit(undefined, 10);
      setDefaultZoomLevel(cy.zoom());
      setCurrentZoomLevel(cy.zoom());

      cyRef.current = cy;
    }
  }, [data]);

  useEffect(() => {
    cyRef.current?.zoom(currentZoomLevel);
  }, [currentZoomLevel]);

  return <Box w={"100%"} h={"100%"} id={"cy"} />;
}

export default Cytoscape;

const layoutProps: CosmosCystoscapeLayoutOptions = {
  name: "cosmos",
  cosmos: {
    spaceSize: 8192,
    simulation: {
      linkDistance: 1,
      friction: 0.85,
      linkSpring: 1,
      repulsion: 0.2,
      repulsionTheta: 1,
      gravity: 0.25,
    },
  },
};
