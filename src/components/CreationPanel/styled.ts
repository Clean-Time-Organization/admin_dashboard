import { styled } from '@mui/system';

export const CreationPanelBase = styled('div')`
  width: 100%;
  max-width: 608px;
  margin: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const CreationPanelBaseHeader = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CreationPanelWorkSpace = styled('div')`
  padding: 32px;
  width: calc(100% - 64px);
  height: fit-content;
  background: #FFF;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const StepperBase = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StepperHead = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const StepperHeadTitle = styled('div')`
  color: #1F2937;
  font-size: 20px;
  font-weight: 600;
  line-height: 130%; 
`;

export const StepperHeadSteps = styled('div')`
  color: #1F2937;
  font-size: 14px;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: 0.28px;

  > span {
    color: #6b7280;
  }
`;

export const StepperLine = styled('div')`
  height: 6px;
  width: 100%;
  border-radius: 100px;
  background: #EEF5FB;
`;

export const StepperLineProgress = styled('div')<{ total: number; current: number}>`
  height: 6px;
  width: ${({total, current}) => ((100 * current) / total) + '%'};
  border-radius: 100px;
  background: #2772AC;
`;
