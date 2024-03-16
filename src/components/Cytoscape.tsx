import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";

import data from "@/utils/data.json";
import style from "@/utils/cy-style.json";
import {
  defaultZoomLavelState,
  currentZoomLavelState,
} from "@/utils/recoil";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useState } from "react";

export interface CytoscapeProps {}

function Cytoscape({}: CytoscapeProps) {
  const [isInit, setIsInit] = useState<boolean>(false);
  const setDefaultZoomLevel = useSetRecoilState(
    defaultZoomLavelState
  );
  const [currentZoomLevel, setCurrentZoomLevel] =
    useRecoilState(currentZoomLavelState);

  const handleCyInit = (cy: cytoscape.Core) => {
    cy.center();

    if (isInit) return;

    cy.fit(undefined, 20);
    setDefaultZoomLevel(cy.zoom());
    setCurrentZoomLevel(cy.zoom());

    setIsInit(true);
  };

  return (
    <CytoscapeComponent
      cy={handleCyInit}
      elements={CytoscapeComponent.normalizeElements(data)}
      style={{ width: "100%", height: "100%" }}
      userZoomingEnabled={false}
      zoom={currentZoomLevel}
      stylesheet={style}
    />
  );
}

export default Cytoscape;
