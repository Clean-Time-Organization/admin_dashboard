import { styled } from '@mui/system';

export const ButtonBase = styled('div')<{selected?: boolean}>`
  padding: 20px 16px;
  height: 164px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${({selected}) => selected ? '#2E8DC8' : '#E5E7EB'};
  background: #FFF;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  :hover {
    border: 1px solid ${({selected}) => selected ? '#2E8DC8' : '#1F2937'};
  }
`;

export const ButtonBaseHeader = styled('div')`
  color: #1F2937;
  font-size: 18px;
  font-weight: 600;
  line-height: 130%;
`;

export const ButtonBaseDescription = styled('div')`
  overflow: hidden;
  color: #1F2937;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: 400;
  line-height: 140%;
`;
