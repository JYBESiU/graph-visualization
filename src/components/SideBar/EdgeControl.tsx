import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Chip from "./Chip";
import { EdgeLabel } from "@/utils/types";
import {
  edgeTypesState,
  selectedEdgeLabelsState,
} from "@/utils/recoil";

export interface EdgeControlProps {
  graphLoading: boolean;
}

function EdgeControl({ graphLoading }: EdgeControlProps) {
  const [isEditing, setIsEditing] = useState(false);

  const edgeTypes = useRecoilValue(edgeTypesState);
  const [selectedEdgeLabels, setSelectedEdgeLabels] =
    useRecoilState(selectedEdgeLabelsState);
  const [tempEdgeLabels, setTempEdgeLabels] = useState(
    selectedEdgeLabels
  );

  useEffect(() => {
    setTempEdgeLabels(selectedEdgeLabels);
  }, [selectedEdgeLabels]);

  const notEditable = graphLoading || !isEditing;

  const handleEdgeClick = (label: EdgeLabel) => () => {
    if (notEditable) return;

    setTempEdgeLabels((prev) => {
      if (prev.includes(label))
        return prev.filter((l) => l !== label);
      else return [...prev, label];
    });
  };

  const handleEditClick = () => {
    if (isEditing) {
      setSelectedEdgeLabels(tempEdgeLabels);
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
          Edges
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

      <Flex direction={"column"} gap={"4px"}>
        {edgeTypes.map((edgeType) => (
          <Chip
            key={edgeType.label}
            label={edgeType.label}
            color={edgeType.color}
            selected={tempEdgeLabels.includes(
              edgeType.label
            )}
            cursor={notEditable ? "not-allowed" : "pointer"}
            onClick={handleEdgeClick(edgeType.label)}
          />
        ))}
      </Flex>
    </Box>
  );
}

export default EdgeControl;
