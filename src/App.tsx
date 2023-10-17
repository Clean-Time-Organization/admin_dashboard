import { memo } from 'react';
import type { FC } from 'react';

import classes from './App.module.css';
import resets from './components/resets.module.css';
import { LogIn } from './components/LogIn/LogIn';

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <div className={`${resets.ctResets} ${classes.root}`}>
      <LogIn />
    </div>
  );
});
