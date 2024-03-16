import useSWR from "swr";
import styled from "@emotion/styled";

import Cytoscape from "@/components/Cytoscape";

export default function Home() {
  const { data, isLoading } = useSWR("/hello");

  return (
    <Root>
      <Cytoscape />
    </Root>
  );
}

const Root = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
