import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import cytoscape, {
  Core,
  ElementDefinition,
} from "cytoscape";
//@ts-ignore
import cise from "cytoscape-cise";

import style from "@/utils/cy-style.json";
import {
  defaultZoomLevelState,
  currentZoomLevelState,
} from "@/utils/recoil";
import { Box } from "@chakra-ui/react";

export interface CytoscapeProps {
  elements: ElementDefinition[];
  clusters: string[][];
}

cytoscape.use(cise);

function CytoscapeClient({
  elements,
  clusters,
}: CytoscapeProps) {
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
    });

    cyRef.current = cy;
  }, []);

  useEffect(() => {
    if (
      elements &&
      elements.length > 0 &&
      clusters.length > 0
    ) {
      cyRef.current?.json({ elements });
      cyRef.current
        ?.layout({
          name: "cise",
          // @ts-ignore
          clusters,
          nodeSeparation: 10,
          animate: "end",
        })
        .run();

      resetFocus(cyRef.current);
    }
  }, [elements, clusters]);

  useEffect(() => {
    cyRef.current?.zoom(currentZoomLevel);
    if (currentZoomLevel === defaultZoomLevel) {
      cyRef.current?.center();
      cyRef.current?.fit(undefined, 10);
    }
  }, [currentZoomLevel, defaultZoomLevel]);

  return <Box w={"100%"} h={"100%"} id={"cy"} />;
}

export default CytoscapeClient;
