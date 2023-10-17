import {FC, memo} from 'react';
import {EllipseIconProps} from "./Props";

export const EllipseIcon: FC<EllipseIconProps> = memo(function EllipseIcon(props) {
    return(
        <svg preserveAspectRatio='none' viewBox={props.viewBox} fill='none' xmlns='http://www.w3.org/2000/svg' {...props.svg}>
            <ellipse {...props.ellipse} strokeWidth={7} />
        </svg>
    );
});

