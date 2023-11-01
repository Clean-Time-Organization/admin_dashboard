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
          <HeaderMenuItemText to={'/'} className={({isActive}) => isActive ? 'active' : ''}>
            Home
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/staff'} className={({isActive}) => isActive ? 'active' : ''}>
            Staff
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/customers'} className={({isActive}) => isActive ? 'active' : ''}>
            Customers
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/laundries'} className={({isActive}) => isActive ? 'active' : ''}>
            Laundries <ArrowDown />
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <HeaderMenuItemText to={'/orders'} className={({isActive}) => isActive ? 'active' : ''}>
            Orders
            <HeaderMenuItemSelection />
          </HeaderMenuItemText>
        </HeaderMenuItem>
    </HeaderMenu>
    </HeaderLeftSide>
    <HeaderRightSide>
      <UserIconPlaceholder>TT</UserIconPlaceholder>
    </HeaderRightSide>
  </BaseHeader>;
}

export { Header };
