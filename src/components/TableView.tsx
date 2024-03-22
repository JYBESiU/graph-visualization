import { Box } from "@chakra-ui/react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "2" },
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
];

export interface TableViewProps {}

function TableView({}: TableViewProps) {
  return (
    <Box w={"100%"} h={"100%"}>
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default TableView;
