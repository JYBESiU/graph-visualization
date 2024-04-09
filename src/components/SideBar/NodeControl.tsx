import { useRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  Grid,
  Spinner,
  Text,
} from "@chakra-ui/react";

import NodeChip from "./NodeChip";
import { useNodeTypes } from "@/hooks";
import { NodeLabel } from "@/utils/types";
import { selectedNodeLabelsState } from "@/utils/recoil";
import { useState } from "react";

export interface NodeControlProps {
  graphLoading: boolean;
}

function NodeControl({ graphLoading }: NodeControlProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { nodeTypes, isLoading } = useNodeTypes();
  const [selectedNodeLabels, setSelectedNodeLabels] =
    useRecoilState(selectedNodeLabelsState);
  const [tempNodeLabels, setTempNodeLabels] = useState(
    selectedNodeLabels
  );

  const notEditable = graphLoading || !isEditing;

  const handleNodeClick = (label: NodeLabel) => () => {
    if (notEditable) return;

    setTempNodeLabels((prev) => {
      if (prev.includes(label))
        return prev.filter((l) => l !== label);
      else return [...prev, label];
    });
  };

  const handleEditClick = () => {
    if (isEditing) {
      setSelectedNodeLabels(tempNodeLabels);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <Box>
      <Flex
        mb={"8px"}
        align={"center"}
        justify={"space-between"}
      >
        <Text fontSize={"18px"} fontWeight={500}>
          Nodes
        </Text>
        <Button
          key={String(isEditing)}
          size={"xs"}
          colorScheme={"blue"}
          onClick={handleEditClick}
        >
          {isEditing ? "Set" : "Edit"}
        </Button>
      </Flex>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid
          templateColumns={"repeat(2, 1fr)"}
          gap={"8px"}
        >
          {nodeTypes.map((nodeType) => (
            <NodeChip
              key={nodeType.label}
              label={nodeType.label}
              color={nodeType.color}
              selected={tempNodeLabels.includes(
                nodeType.label
              )}
              cursor={
                notEditable ? "not-allowed" : "pointer"
              }
              onClick={handleNodeClick(nodeType.label)}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default NodeControl;
