import { useRecoilState } from "recoil";
import { Box, Spinner, Text } from "@chakra-ui/react";

import NodeChip from "./NodeChip";
import { useNodeTypes } from "@/hooks";
import { NodeLabel } from "@/utils/types";
import { selectedNodeLabelsState } from "@/utils/recoil";

export interface NodeControlProps {
  graphLoading: boolean;
}

function NodeControl({ graphLoading }: NodeControlProps) {
  const { nodeTypes, isLoading } = useNodeTypes();
  const [selectedNodeLabels, setSelectedNodeLabels] =
    useRecoilState(selectedNodeLabelsState);

  const handleNodeClick = (label: NodeLabel) => () => {
    if (graphLoading) return;

    setSelectedNodeLabels((prev) => {
      if (prev.includes(label))
        return prev.filter((l) => l !== label);
      else return [...prev, label];
    });
  };

  return (
    <Box>
      <Text fontSize={"18px"} fontWeight={500} mb={"8px"}>
        Nodes
      </Text>
      {isLoading ? (
        <Spinner />
      ) : (
        nodeTypes.map((nodeType) => (
          <NodeChip
            key={nodeType.label}
            label={nodeType.label}
            color={nodeType.color}
            selected={selectedNodeLabels.includes(
              nodeType.label
            )}
            cursor={
              graphLoading ? "not-allowed" : "pointer"
            }
            onClick={handleNodeClick(nodeType.label)}
          />
        ))
      )}
    </Box>
  );
}

export default NodeControl;
