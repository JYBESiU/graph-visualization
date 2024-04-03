import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import { useTableSchema } from "@/hooks";

export interface TableViewProps {}

function TableView({}: TableViewProps) {
  const { fitView } = useReactFlow();
  const { nodeSchema, edgeSchema } = useTableSchema();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    []
  );

  useEffect(() => {
    if (
      nodeSchema &&
      nodeSchema.length > 0 &&
      edgeSchema &&
      edgeSchema.length > 0
    ) {
      setNodes(nodeSchema);
      setEdges(edgeSchema);
    }
    fitView();
  }, [nodeSchema, setNodes, edgeSchema, setEdges, fitView]);

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
