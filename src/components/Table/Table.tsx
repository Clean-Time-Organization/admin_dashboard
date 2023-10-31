import { FC } from "react";
import { Pagination } from "./Pagination";
import { PaginationBlock, TableBlock, TableBody } from "./styled";

interface ITableProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  children: JSX.Element;
}

const Table: FC<ITableProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  children,
}) => {
  return <TableBody>
    <TableBlock>
      {children}
    </TableBlock>
    {
      totalPages > 1 &&
        <PaginationBlock>
          <Pagination totalPages={totalPages} currentPage={currentPage} changePage={setCurrentPage} />
        </PaginationBlock>
    }
  </TableBody>
}

export { Table };
