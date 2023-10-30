import { styled } from '@mui/system';

export const ContentBody = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FilterRow = styled('div')`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Logo = styled('div')`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #EEF5FB;
  border-radius: 100%;
  color:  #1A4C73;
  text-align: center;
  text-edge: cap;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
  text-transform: uppercase;
`;

export const Name = styled('div')`
  color: #0E1019;
  leading-trim: both;
  text-edge: cap;
  font-size: 18px;
  font-weight: 600;
  line-height: 120%;
`;

export const BasicText = styled('div')`
  color: #0E1019;
  leading-trim: both;
  text-edge: cap;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  text-overflow: ellipsis;
  display: flex;
  height: fit-content;
  align-items: center;
`;

export const BasicTextName = styled(BasicText)`
  color: #2E8DC8;
`;

export const ColoredText = styled('div')<{color: string}>`
  color: ${({color}) => color};
`;
