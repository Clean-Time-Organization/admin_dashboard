import {SVGProps} from "react";

export interface EllipseIconProps {
  svg?: SVGProps<SVGSVGElement>;
  viewBox: string;
  ellipse: {
    stroke: string,
    cx: number,
    cy: number,
    rx: number,
    ry: number
  }
}

export interface CircleIconProps {
  svg?: SVGProps<SVGSVGElement>;
  viewBox: string;
  circle: {
    stroke: string,
    cx: number,
    cy: number,
    r: number
  }
}
