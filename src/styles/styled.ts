import { styled } from '@mui/system';

export const ContentBody = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Anek Latin', sans-serif;
`;

export const FilterRow = styled('div')`
  display: flex;
  gap: 12px;
  align-items: center;

  > .MuiButtonBase-root {
    height: 28px;
  }
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; 
`;

export const NameLink = styled('div')`
  color: #2E8DC8;
  leading-trim: both;
  text-edge: cap;
  font-size: 18px;
  font-weight: 600;
  line-height: 120%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; 
  // cursor: pointer;
  // &:hover {
  //   text-decoration: underline;
  // }
`;

export const BasicText = styled('div')`
  color: #0E1019;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  display: flex;
  height: fit-content;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;   
`;

export const BasicTextName = styled('span')`
  color: #2E8DC8;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  // width: 290px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const BasicTextNameLink = styled('span')`
  color: #2E8DC8;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  // width: 290px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const ColoredText = styled('div')<{color: string}>`
  color: ${({color}) => color};
`;

export const Chips = styled('div')`
  padding: 4px 8px;
  background: #E8E8EA;
  font-size: 14px;
  font-weight: 500;
  line-height: 140.5%;
  display: flex;
  gap: 4px;
  align-items: center;
  border-radius: 4px;
  font-family: 'Anek Latin', sans-serif;
`;

export const ChipsOverflow = styled(Chips)`
  padding: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
`;

export const ChipsButton = styled('div')`
  display: flex;
  cursor: pointer;
`;

export const HintText = styled('div')`
  color: #656873;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  font-family: 'Anek Latin', sans-serif;
`;
