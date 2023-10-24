import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

export const BreadcrumbsBody = styled('div')`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #4B5563;
`;

export const BreadcrumbsLink = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #4B5563;
`;

export const BreadcrumbsElement = styled('div')`
  text-decoration: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #2E8DC8;
`;