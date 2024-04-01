import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

import { useEdgesByNodes } from "@/hooks";
import { selectedNodeLabelSchemaState } from "@/utils/recoil";

export interface TableViewProps {}

function TableView({}: TableViewProps) {
  const initialNodes = useRecoilValue(
    selectedNodeLabelSchemaState
  );
  const { edges: initialEdges } = useEdgesByNodes();

  const [nodes, setNodes, onNodesChange] =
    useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  useEffect(() => {
    if (initialEdges.length > 0) {
      setEdges(initialEdges);
    }
  }, [setEdges, initialEdges]);

  return (
    <Box w={"100%"} h={"100%"}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default TableView;
