import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import cytoscape, {
  Core,
  CoseLayoutOptions,
  ElementDefinition,
} from "cytoscape";

import style from "@/utils/cy-style.json";
import {
  defaultZoomLevelState,
  currentZoomLevelState,
  scaleFactorState,
  preDefinedQueryState,
} from "@/utils/recoil";
import { Box } from "@chakra-ui/react";

export interface CytoscapeProps {
  elements: ElementDefinition[];
}

function CytoscapeClient({ elements }: CytoscapeProps) {
  const cyRef = useRef<Core>();
  const [defaultZoomLevel, setDefaultZoomLevel] =
    useRecoilState(defaultZoomLevelState);
  const [currentZoomLevel, setCurrentZoomLevel] =
    useRecoilState(currentZoomLevelState);

  const sf = useRecoilValue(scaleFactorState);
  const query = useRecoilValue(preDefinedQueryState);

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
    if (elements && elements.length > 0) {
      console.time("time by console");
      const startTime = performance.now();

      cyRef.current?.json({ elements });
      cyRef.current?.layout(coseLayout).run();

      console.timeEnd("time by console");
      const endTime = performance.now();
      console.log(
        `sf: ${sf}, query: ${query}, time by performance: ${(
          endTime - startTime
        ).toFixed(0)} ms`
      );

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

export default CytoscapeClient;

const coseLayout: CoseLayoutOptions = {
  name: "cose",
  animate: false,
  randomize: true,
  componentSpacing: 100,
  nodeRepulsion: (node) => 100 * Math.pow(node.degree(), 3),
  idealEdgeLength: (edge) => 64,
};
