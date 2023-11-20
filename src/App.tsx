import { memo } from 'react';
import type { FC } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { MainLayout } from './components/MainLayout/MainLayout';
import { Staff } from './pages/Staff';
import {QueryClient, QueryClientProvider} from "react-query";
import { Customers } from './pages/Customers';
import { Home } from './pages/Home';
import { CreateStuffUser } from './pages/Stuff/Create';
import {Laundries} from "./pages/Laundries";
import RequireAuth from "./components/Auth/RequireAuth";
import {PageNotFound} from "./pages/PageNotFound";
import {CustomerDetails} from "./pages/CustomerDetails";
import {StaffDetails} from "./pages/StaffDetails";
import {StaffEditInfo} from "./pages/StaffEditInfo";
import {LaundryDetails} from "./pages/LaundryDetails";

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
            <Route path={'/staff'} element={<RequireAuth><Staff /></RequireAuth>} />
            <Route path={'/staff/create'} element={<RequireAuth><CreateStuffUser /></RequireAuth>} />
            <Route path={'/staff/:id'} element={<RequireAuth><StaffDetails /></RequireAuth>} />
            <Route path={'/staff/edit/:id'} element={<RequireAuth><StaffEditInfo /></RequireAuth>} />
            <Route path={'/customers'} element={<RequireAuth><Customers /></RequireAuth>} />
            <Route path={'/customers/:id'} element={<RequireAuth><CustomerDetails /></RequireAuth>} />
            <Route path={'/laundries'} element={<RequireAuth><Laundries /></RequireAuth>} />
            <Route path={'/laundries/:id'} element={<RequireAuth><LaundryDetails /></RequireAuth>} />
            <Route path={'/orders'} element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
})
