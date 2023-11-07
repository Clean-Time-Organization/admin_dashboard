import { Header } from '../Header/Header';
import {
  Main,
  Content,
} from './styled';
import {useLocation} from "react-router-dom";
import {ReactNode} from "react";

const MainLayout = ({children}: {children: ReactNode}) => {
  const location = useLocation()

  if (location.pathname.toLowerCase().slice(0, 6) === '/login') return <>{children}</>

  return <Main>
    <Header />
    <Content>
      {children}
    </Content>
  </Main>
}

export { MainLayout }
