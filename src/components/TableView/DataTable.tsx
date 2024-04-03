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

export interface DataTableProps {
  data: NodeData[];
}

function DataTable({ data }: DataTableProps) {
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
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
