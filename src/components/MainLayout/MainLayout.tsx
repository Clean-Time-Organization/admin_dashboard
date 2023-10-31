import { Header } from '../Header/Header';
import {
  Main,
  Content,
} from './styled';

const MainLayout = ({ children }) => {
  return <Main>
    <Header />
    <Content>
      {children}
    </Content>
  </Main>
}

export { MainLayout };