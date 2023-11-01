import { styled } from '@mui/system';

export const EmptyStateBase = styled('div')`
  padding: 58px 110px;
  width: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #fff;

  > svg {
    margin-bottom: 44px;
  }

  > .MuiButtonBase-root {
    margin-top: 12px;
  }
`;

export const EmptyStateContainer = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyStateTitle = styled('div')`
  color: #1F2937;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 120%;
`;

export const EmptyStateSubtitle = styled('div')`
  color: #6B7280;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;
