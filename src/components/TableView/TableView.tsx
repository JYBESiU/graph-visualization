import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import { useTableSchema } from "@/hooks";
import SelfConnectEdge from "./SelfConnectEdge";

export interface TableViewProps {}

const edgeTypes = {
  selfConnect: SelfConnectEdge,
};

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
      setEdges(
        edgeSchema.map((e) => ({
          ...e,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }))
      );
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
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default TableView;
