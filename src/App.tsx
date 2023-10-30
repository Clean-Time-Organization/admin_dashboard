import { memo } from 'react';
import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import classes from './App.module.css';
import resets from './components/resets.module.css';
import { LogIn } from './components/LogIn/LogIn';
import { MainLayout } from './components/MainLayout/MainLayout';
import { Stuff } from './pages/Stuff';
import {QueryClient, QueryClientProvider} from "react-query";

interface Props {
  className?: string;
}

const queryClient = new QueryClient()

export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <div className={`${resets.ctResets} ${classes.root}`}>
        <LogIn />
      </div> */}
      <MainLayout>
        <Routes>
          <Route path={'/'} element={<Stuff />} />
          <Route path={'/staff'} element={<Stuff />} />
          <Route path={'/customers'} element={<Stuff />} />
          <Route path={'/laundries'} element={<Stuff />} />
          <Route path={'/orders'} element={<Stuff />} />
        </Routes>
      </MainLayout>
    </QueryClientProvider>
  );
});
