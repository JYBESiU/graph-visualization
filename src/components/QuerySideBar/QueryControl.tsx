import { useRecoilState } from "recoil";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";

import { preDefinedQueryState } from "@/utils/recoil";

export interface QueryControlProps {}

function QueryControl({}: QueryControlProps) {
  const [query, setQuery] = useRecoilState(
    preDefinedQueryState
  );

  return (
    <Box>
      <Text fontSize={"18px"} fontWeight={500} mb={"8px"}>
        Query
      </Text>
      <RadioGroup onChange={setQuery} value={query}>
        <Flex direction={"column"} gap={"4px"}>
          <Radio value="">-</Radio>
          <Radio value="knows">Knows</Radio>
          <Radio value="likes">Likes</Radio>
          <Radio value="hasMember">Has Member</Radio>
        </Flex>
      </RadioGroup>
    </Box>
  );
}

export default QueryControl;
