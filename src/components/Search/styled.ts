import { styled } from '@mui/system';

export const SearchBody = styled('div')<{focused: boolean}>`
  height: calc(100% - 2px);
  max-height: 34px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: ${({ focused }) => focused ? 'white' : 'transparent'};
  border: ${({ focused }) => focused ? '1px solid #e8e8ea' : 'none'};
  border-radius: 4px;

  > .MuiInputBase-root {
    > .MuiInputBase-input {
      padding: 0;
      font-size: 14px; 
      font-weight: 400;
      line-height: 150%;
    }

    &::before, &::after {
      display: none;
    }
  }
`;

export const SearchIcon = styled('div')`
  display: flex;
  padding: 2px 4px;
`;