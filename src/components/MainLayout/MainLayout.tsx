import { Header } from '../Header/Header';
import {
  Main,
  Content,
} from './styled.ts';
import {useLocation} from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();
  if (location.pathname.toLowerCase().slice(0, 6) === '/login') return children
  return <Main>
    <Header />
    <Content>
      {children}
    </Content>
  </Main>
}

export { MainLayout };
