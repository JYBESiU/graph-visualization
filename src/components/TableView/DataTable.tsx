import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { NodeData } from "@/utils/types";
import InfiniteLoading from "../InfiniteLoading";

export interface DataTableProps {
  data: NodeData[];
  loadMore?: () => void;
  isLoadingMore?: boolean;
  isReachingEnd?: boolean;
}

function DataTable({
  data,
  loadMore,
  isLoadingMore,
  isReachingEnd,
}: DataTableProps) {
  const columns = Object.keys(data[0]);

  return (
    <TableContainer overflowX={"scroll"}>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum) => (
            <Tr key={datum.vertex_id}>
              {columns.map((column) => (
                <Td key={`${datum.vertex_id}${column}`}>
                  {datum[column]}
                </Td>
              ))}
            </Tr>
          ))}
          <InfiniteLoading
            loadMore={loadMore}
            isReachingEnd={isReachingEnd}
            isLoadingMore={isLoadingMore}
          />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
