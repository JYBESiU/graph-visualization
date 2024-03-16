import cytoscape from "cytoscape";
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";

import style from "@/utils/cy-style.json";
import data from "@/utils/data.json";

export interface CytoscapeProps {}

function Cytoscape({}: CytoscapeProps) {
  const cyRef = useRef<cytoscape.Core & void>();

  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById("cy"),
      style,
      elements: data,
    });

    cyRef.current = cy;
  }, []);

  return <Container id="cy" />;
}

export default Cytoscape;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #fafafa;
`;
