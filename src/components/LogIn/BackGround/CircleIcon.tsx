import {FC, memo} from 'react';
import {CircleIconProps} from "./Props";

export const CircleIcon: FC<CircleIconProps> = memo(function CircleIcon(props) {
    return(
        <svg preserveAspectRatio='none' viewBox={props.viewBox} fill='none' xmlns='http://www.w3.org/2000/svg' {...props.svg}>
            <circle {...props.circle} strokeWidth={7} />
        </svg>
    );
});

