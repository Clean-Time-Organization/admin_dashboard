import { styled } from "@mui/material";

export const DetailsBody = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PageTitle = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
  color: #1F2937;
  font-size: 24px;
  font-weight: 600;
`;

export const OrderStatus = styled('div')<{ color: string; background: string }>`
  padding: 2px 6px;
  color: ${({color}) => color};
  background: ${({background}) => background};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.28px;
  width: fit-content;
`;

export const BasicText = styled('div')`
  color: #0E1019;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
`;

export const MainDataBlocks = styled('div')`
  margin-top: 16px;
  display: flex;
  gap: 24px;
`;

export const DataBlock = styled('div')<{ width: string }>`
  border-radius: 4px;
  background: #FFF;
  width: ${({width}) => 'calc(' + width + ' + 48px)'};
  height: fit-content;
`;

export const Divider = styled('div')`
  height: 1px;
  width: 100%;
  background: #DCDCDE;
`;

export const TextSide = styled('div')`
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const TextSubside = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DataBlockTitle = styled('div')`
  color: #0E1019;
  font-size: 20px;
  font-weight: 600;
  line-height: 120%;
`;

export const FieldBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldTitle = styled('div')`
  color: #95979F;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`;

export const LinkedBasicText = styled('a')`
  color: #2E8DC8;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  text-decoration: none;
`;

export const NumberBasicText = styled(BasicText)`
  color: #1F2937;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;
