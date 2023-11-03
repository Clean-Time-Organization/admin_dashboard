import { memo } from 'react';
import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { MainLayout } from './components/MainLayout/MainLayout';
import { Stuff } from './pages/Stuff';
import {QueryClient, QueryClientProvider} from "react-query";
import { Customers } from './pages/Customers';
import { Home } from './pages/Home';
import { CreateStuffUser } from './pages/Stuff/Create';

const queryClient = new QueryClient()

export const App: FC = memo(function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<LogIn />} />
          <Route path={'/login/:token'} element={<LogIn />} />
          <Route path={'/staff'} element={<Stuff />} />
          <Route path={'/staff/create'} element={<CreateStuffUser />} />
          <Route path={'/customers'} element={<Customers />} />
          <Route path={'/laundries'} element={<Home />} />
          <Route path={'/orders'} element={<Home />} />
        </Routes>
      </MainLayout>
    </QueryClientProvider>
  );
});