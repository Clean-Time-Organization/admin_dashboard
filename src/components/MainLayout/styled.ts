import { styled } from '@mui/system';

const Main = styled('div')`
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background: #F7F8FA;
`;

const Content = styled('div')`
  padding-top: 32px;
  padding-bottom: 90px;
  height: 100%;
  width: 1024px;
  position: relative;
`;

export { Main, Content };
