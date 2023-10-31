import { FC } from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  changePage,
}) => {
  const handleChangePage = (event: React.ChangeEvent<any>, page: number) => {
    changePage(page);
  };

  return <MuiPagination
    count={totalPages}
    page={currentPage}
    shape={'rounded'}
    onChange={handleChangePage}
  ></MuiPagination>;
}

export { Pagination };
