import logoSmall from '/assets/logoSmall.png';
import { ArrowDown } from '../Icons/ArrowDown';
import {
  BaseHeader,
  HeaderLogo,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuItemText,
  HeaderMenuItemSelection,
  HeaderRightSide,
  HeaderLeftSide,
  UserIconPlaceholder,
} from './styled';

const Header = () => {
  return <BaseHeader>
    <HeaderLeftSide>
      <HeaderLogo>
        <img src={logoSmall} />
      </HeaderLogo>
      <HeaderMenu>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/'} activeClassName="active">
            Home
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/staff'} activeClassName="active">
            Staff
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/customers'} activeClassName="active">
            Customers
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/laundries'} activeClassName="active">
            Laundries <ArrowDown />
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/orders'} activeClassName="active">
            Orders
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
    </HeaderMenu>
    </HeaderLeftSide>
    <HeaderRightSide>
      <UserIconPlaceholder>AB</UserIconPlaceholder>
    </HeaderRightSide>
  </BaseHeader>;
}

export { Header };
