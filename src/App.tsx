import { memo } from 'react';
import type { FC } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { MainLayout } from './components/MainLayout/MainLayout';
import { Stuff } from './pages/Stuff';
import {QueryClient, QueryClientProvider} from "react-query";
import { Customers } from './pages/Customers';
import { Home } from './pages/Home';
import { CreateStuffUser } from './pages/Stuff/Create';
import {Laundries} from "./pages/Laundries";
import RequireAuth from "./components/Auth/RequireAuth";
import {PageNotFound} from "./pages/PageNotFound";
import {CustomerDetails} from "./pages/CustomerDetails";

const queryClient = new QueryClient()

export const App: FC = memo(function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={'/login'} element={<LogIn />} />
            <Route path={'/login/:token'} element={<LogIn />} />
            <Route path={'/'} element={<RequireAuth><Home /></RequireAuth>} />
            <Route path={'/home'} element={<RequireAuth><Home /></RequireAuth>} />
            <Route path={'/staff'} element={<RequireAuth><Stuff /></RequireAuth>} />
            <Route path={'/staff/create'} element={<RequireAuth><CreateStuffUser /></RequireAuth>} />
            <Route path={'/customers'} element={<RequireAuth><Customers /></RequireAuth>} />
            <Route path={'/customers/:id'} element={<RequireAuth><CustomerDetails /></RequireAuth>} />
            <Route path={'/laundries'} element={<RequireAuth><Laundries /></RequireAuth>} />
            <Route path={'/orders'} element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
})
