import { styled } from '@mui/system';

export const DropdownBody = styled('div')<{selected?: boolean}>`
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: 59px;
  height: 18px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140.5%;
  border-radius: 4px;
  position: relative;
  border: 1px solid ${({selected}) => selected ? '#2E8DC8' : '#95979F'};
  background: ${({selected}) => selected ? '#EEF5FB' : 'transparent'};
  color: ${({selected}) => selected ? '#0E1019' : '#474A58'};
`;

export const DropdownPanel = styled('div')`
  padding-top: 8px;
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  width: 300px;
  display: flex;
  flex-direction: column;
  background: #FFF;
  box-shadow: 0px 2px 6px 2px rgba(100, 116, 142, 0.15), 0px 1px 2px 0px rgba(100, 116, 142, 0.30);
  z-index: 3;

  > .MuiFormGroup-root {
    padding: 0 11px;
  }
`;

export const DropdownPanelButtons = styled('div')`
  padding: 8px 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  border-top: 1px solid #E5E7EB;
`;
