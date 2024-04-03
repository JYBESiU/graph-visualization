import { useOnScreen } from "@/hooks";
import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export interface InfiniteLoadingProps {
  height?: number;
  size?: number;
  loadMore?: () => void;
  isLoadingMore?: boolean;
  isReachingEnd?: boolean;
}

function InfiniteLoading({
  loadMore,
  isLoadingMore = false,
  isReachingEnd = false,
}: InfiniteLoadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (
      loadMore &&
      isVisible &&
      !isLoadingMore &&
      !isReachingEnd
    ) {
      loadMore();
    }
  }, [isVisible]);

  return (
    <Flex
      align={"center"}
      justify={"center"}
      h={"20px"}
      ref={ref}
    >
      {isReachingEnd ? null : <Spinner size={"md"} />}
    </Flex>
  );
}

export default InfiniteLoading;
