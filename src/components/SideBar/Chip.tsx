import { Flex, FlexProps, Text } from "@chakra-ui/react";

export interface ChipProps extends FlexProps {
  label: string;
  color: string;
  selected: boolean;
}

function Chip({
  label,
  color,
  selected,
  ...rest
}: ChipProps) {
  return (
    <Flex
      w={"100%"}
      h={"30px"}
      bg={color}
      align={"center"}
      justify={"center"}
      borderRadius={"18px"}
      opacity={selected ? 1 : 0.2}
      {...rest}
    >
      <Text fontSize={"11px"} fontWeight={600}>
        {label.toUpperCase()}
      </Text>
    </Flex>
  );
}

export default Chip;
