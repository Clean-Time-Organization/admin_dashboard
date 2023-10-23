import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const BaseHeader = styled('div')`
  padding: 0 40px; 
  width: calc(100% - 80px);
  height: 64px;
  border-bottom: 1px solid #E5E7EB;
  background: #FFF;
  display: flex;
  gap: 48px;
  justify-content: space-between;
`;

const HeaderLeftSide = styled('div')`
  display: flex;
  gap: 48px;
`;

const HeaderLogo = styled('div')`
  height: 100%;
  width: 62px;
  display: flex;
  align-items: center;
`;

const HeaderMenu = styled('div')`
  height: 100%;
  display: flex;
  gap: 24px;
`;

const HeaderMenuItem = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  &:hover {
    background: #E5E7EB;
    cursor: pointer;
  }
`;

const HeaderMenuItemText = styled(NavLink)`
  padding: 0 4px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #1F2937;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
  line-height: 150%;
  position: relative;

  &.active {
    > div {
      height: 4px;
    }
  }
`;

const HeaderMenuItemSelection = styled('div')`
  background: #2E8DC8;
  height: 0;
  width: 100%;
  border-radius: 1px 1px 0px 0px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const HeaderRightSide = styled('div')`
  display: flex;
  align-items: center;
`;

const UserIconPlaceholder = styled('div')`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: #DCEBF7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2772AC;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

export {
  BaseHeader,
  HeaderLogo,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuItemText,
  HeaderMenuItemSelection,
  HeaderLeftSide,
  HeaderRightSide,
  UserIconPlaceholder,
};
