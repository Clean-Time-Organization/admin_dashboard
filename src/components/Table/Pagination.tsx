import { FC } from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: FC<IPaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  return <MuiPagination
    count={totalPages}
    page={currentPage}
    shape={'rounded'}
  ></MuiPagination>;
}

export { Pagination };
