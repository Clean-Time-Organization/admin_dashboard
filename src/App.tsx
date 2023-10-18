import { memo } from 'react';
import type { FC } from 'react';

import classes from './App.module.css';
import resets from './components/resets.module.css';
import { LogIn } from './components/LogIn/LogIn';
import {QueryClient, QueryClientProvider} from "react-query";

interface Props {
  className?: string;
}

const queryClient = new QueryClient()

export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${resets.ctResets} ${classes.root}`}>
        <LogIn />
      </div>
    </QueryClientProvider>
  );
});
