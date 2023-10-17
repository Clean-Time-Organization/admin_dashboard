import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../resets.module.css';
import classes from './LoadingButton.module.css';

interface Props {
  className?: string;
  text?: {
    labelText?: ReactNode;
  };
}
/* @figmaId 88:58076 */
export const LoadingButton: FC<Props> = memo(function LoadingButton(props = {}) {
  return (
    <button className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.stateLayer}>
        {props.text?.labelText != null ? props.text?.labelText : <div className={classes.labelText}>Label</div>}
      </div>
    </button>
  );
});
