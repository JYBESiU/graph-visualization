import { Flex, FlexProps, Text } from "@chakra-ui/react";

export interface NodeChipProps extends FlexProps {
  label: string;
  color: string;
  selected: boolean;
}

function NodeChip({
  label,
  color,
  selected,
  ...rest
}: NodeChipProps) {
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
      opacity={selected ? 1 : 0.2}
      {...rest}
    >
      <Text fontSize={"14px"} fontWeight={600}>
        {label.toUpperCase()}
      </Text>
    </Flex>
  );
}

export default NodeChip;
