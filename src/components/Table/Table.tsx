import { Pagination } from "./Pagination";
import { PaginationBlock, TableBlock, TableBody } from "./styled";

const Table = ({ children }) => {
  return <TableBody>
    <TableBlock>
      {children}
    </TableBlock>
    <PaginationBlock>
      <Pagination totalPages={10} currentPage={1} />
    </PaginationBlock>
  </TableBody>
}

export { Table };
