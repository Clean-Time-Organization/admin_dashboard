import {memo} from 'react';
import type { FC } from 'react';
import resets from '../../resets.module.css';
import classes from './BackGround.module.css';
import { EllipseIcon } from './EllipseIcon.js';
import {CircleIcon} from "./CircleIcon";
import {CircleIconProps, EllipseIconProps} from "./Props";

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}

const ellipse1Props: EllipseIconProps = {
  svg: {
    className: classes.icon
  },
  viewBox: '0 0 504 505',
  ellipse: {
    stroke: '#62A6DB',
    cx: 252,
    cy: 252.5,
    rx: 252,
    ry: 252.5
  }
};

const ellipse2Props: EllipseIconProps = {
  svg: {
    className: classes.icon
  },
  viewBox: '0 0 504 505',
  ellipse: {
    stroke: '#6ABF5C',
    cx: 252,
    cy: 252.5,
    rx: 252,
    ry: 252.5
  }
};

const circle1Props: CircleIconProps = {
  svg: {
    className: classes.icon
  },
  viewBox: '0 0 1460 1460',
  circle: {
    stroke: '#62A6DB',
    cx: 730,
    cy: 730,
    r: 730
  }
};

const circle2Props: CircleIconProps = {
  svg: {
    className: classes.icon
  },
  viewBox: '0 0 1460 1460',
  circle: {
    stroke: '#6ABF5C',
    cx: 730,
    cy: 730,
    r: 730
  }
};

export const BackGround: FC<Props> = memo(function BackGround(props = {}) {
  return (
    <div className={`${resets.ctResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.ellipse1}>
        <EllipseIcon {...ellipse1Props}/>
      </div>
      <div className={classes.ellipse2}>
        <EllipseIcon {...ellipse2Props}/>
      </div>
      <div className={classes.circle1}>
        <CircleIcon {...circle1Props}/>
      </div>
      <div className={classes.circle2}>
        <CircleIcon {...circle2Props}/>
      </div>
      <div className={classes.rectangle}></div>
    </div>
  );
});
