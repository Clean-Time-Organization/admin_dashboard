import { styled } from '@mui/system';

export const TableBody = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TableBlock = styled('div')`
  height: calc(100% - 40px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

export const PaginationBlock = styled('div')`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > .MuiPagination-root {
    > .MuiPagination-ul {
      > li {
        > .MuiButtonBase-root {
          height: 24px;
          width: 24px;
          min-width: 24px;
          padding: 8px;
          border-radius: 2px;
          font-size: 14px;
          font-weight: 500;
          line-height: 140.5%;
          font-family: 'Anek Latin', sans-serif;

          &.Mui-selected {
            background: #2E8DC8;
            color: #fff;
          }
        }
      }
    }
  }
`;

export const TableRowLayout = styled('div')<{ active: boolean }>`
  width: 100%;
  height: 37px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  opacity: ${({active}) => active ? '1' : '0.64'};
`;
