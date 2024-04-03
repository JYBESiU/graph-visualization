import { Box, Spinner, Text } from "@chakra-ui/react";
import {
  Handle,
  NodeProps,
  Position,
  NodeResizer,
} from "reactflow";

import { useNodeData } from "@/hooks";
import { NodeLabel } from "@/utils/types";
import DataTable from "./DataTable";

function CustomNode({ id, data, selected }: NodeProps) {
  const { label, bg } = data;

  const {
    nodeData,
    isEmpty,
    isLoading,
    isReachingEnd,
    loadMore,
  } = useNodeData(id as NodeLabel);

  return (
    <div className="nowheel">
      <Handle type="target" position={Position.Top} />
      <Box
        borderRadius={"4px"}
        border={"1px"}
        overflow={"hidden"}
        maxW={"400px"}
      >
        <Text
          fontSize={"12px"}
          px={"8px"}
          py={"4px"}
          fontWeight={600}
          bg={bg}
          borderBottom={"1px"}
        >
          {label}
        </Text>
        <Box
          bg={"white"}
          w={"100%"}
          overflowY={"scroll"}
          maxHeight={"300px"}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <DataTable data={nodeData} />
          )}
        </Box>
      </Box>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
