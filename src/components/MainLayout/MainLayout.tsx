import { Header } from '../Header/Header';
import {
  Main,
  Content,
} from './styled.ts';

const MainLayout = ({ children }) => {
  return <Main>
    <Header />
    <Content>
      {children}
    </Content>
  </Main>
}

export { MainLayout };