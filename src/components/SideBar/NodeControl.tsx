import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

import { useNodeTypes } from "@/hooks";

export interface NodeControlProps {}

function NodeControl({}: NodeControlProps) {
  const { nodeTypes, isLoading } = useNodeTypes();

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
            key={nodeType.name}
            name={nodeType.name}
            color={nodeType.color}
          />
        ))
      )}
    </Box>
  );
}

export default NodeControl;

const NodeChip = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => {
  return (
    <Flex
      w={"200px"}
      h={"32px"}
      align={"center"}
      px={"24px"}
      bg={color}
      borderRadius={"18px"}
      mb={"8px"}
      cursor={"pointer"}
    >
      <Text fontSize={"14px"} fontWeight={600}>
        {name}
      </Text>
    </Flex>
  );
};
