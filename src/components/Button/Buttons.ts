import { styled } from '@mui/system';
import { Button } from './Button';

export const BasicButton = styled(Button)<{ pretext?: boolean | string }>`
  padding: 10px ${({pretext}) => !pretext ? '16px' : '24px' } 10px 16px;
  border-radius: 4px;
  background: #2E8DC8;
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 142%;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  text-transform: none;

  &:hover {
    background: #2E8DC898;
  }
`;

export const LinkButton = styled(BasicButton)`
  background: transparent;
  color: #2E8DC8;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;
