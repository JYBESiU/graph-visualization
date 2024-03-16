import useSWR from "swr";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import ZoomControl from "@/components/ZoomControl";

const Cytoscape = dynamic(
  () => import("@/components/Cytoscape"),
  { ssr: false }
);

export default function Home() {
  const { data, isLoading } = useSWR("/hello");

  return (
    <Root>
      <Cytoscape />
      <ZoomControl />
    </Root>
  );
}

const Root = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;
