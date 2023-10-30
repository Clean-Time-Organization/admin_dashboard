import { memo } from 'react';
import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { MainLayout } from './components/MainLayout/MainLayout';
import { Stuff } from './pages/Stuff';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

export const App: FC = memo(function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Routes>
          <Route path={'/'} element={<Stuff />} />
          <Route path={'/login'} element={<LogIn />} />
          <Route path={'/login/:token'} element={<LogIn />} />
          <Route path={'/staff'} element={<Stuff />} />
          <Route path={'/customers'} element={<Stuff />} />
          <Route path={'/laundries'} element={<Stuff />} />
          <Route path={'/orders'} element={<Stuff />} />
        </Routes>
      </MainLayout>
    </QueryClientProvider>
  );
});
