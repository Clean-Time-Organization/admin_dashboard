import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../resets.module.css';
import classes from './TextInput.module.css';

interface Props {
  name?: string;
  label?: string;
  type?: string;
  register?: any,
  validationSchema?: any,
  errors?: any;
  className?: string;
  classes?: {
    inputText?: string;
    root?: string;
  };
  hide?: {
    supportingText?: boolean;
  };
  text?: {
    labelText?: ReactNode;
  };
}

export const TextInput: FC<Props> = memo(function TextInput(props = {}) {
  return (
    <div className={`${resets.ctResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={'stateLayer content'}>
        <div className={`${props.classes?.inputText || ''} ${classes.inputText}`}>
          <fieldset>
            <legend>
              {props.label}
            </legend>
            <input
              name={props.name}
              type={props.type}
              className={classes.inputText2}
              {...props.register(props.name, props.validationSchema)}/>
          </fieldset>
        </div>
      </div>
      {!props.hide?.supportingText && (
          <div className={classes.supportingText}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_1_5391" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                <rect width="16" height="16" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_1_5391)">
                <path d="M7.99982 11.1538C8.15239 11.1538 8.28027 11.1022 8.38347 10.999C8.48667 10.8958 8.53827 10.7679 8.53827 10.6154C8.53827 10.4628 8.48667 10.3349 8.38347 10.2317C8.28027 10.1285 8.15239 10.0769 7.99982 10.0769C7.84725 10.0769 7.71937 10.1285 7.61617 10.2317C7.51297 10.3349 7.46137 10.4628 7.46137 10.6154C7.46137 10.7679 7.51297 10.8958 7.61617 10.999C7.71937 11.1022 7.84725 11.1538 7.99982 11.1538ZM8.00004 8.71795C8.14177 8.71795 8.2605 8.67004 8.35622 8.5742C8.45194 8.47838 8.4998 8.35964 8.4998 8.21797V5.21794C8.4998 5.07628 8.45187 4.95754 8.356 4.8617C8.26013 4.76587 8.14133 4.71795 7.9996 4.71795C7.85787 4.71795 7.73914 4.76587 7.64342 4.8617C7.5477 4.95754 7.49984 5.07628 7.49984 5.21794V8.21797C7.49984 8.35964 7.54777 8.47838 7.64364 8.5742C7.73951 8.67004 7.85831 8.71795 8.00004 8.71795ZM8.00094 14.3333C7.12498 14.3333 6.30163 14.1671 5.53087 13.8347C4.7601 13.5022 4.08965 13.051 3.5195 12.4812C2.94935 11.9113 2.49798 11.2411 2.16539 10.4707C1.8328 9.70026 1.6665 8.87708 1.6665 8.00112C1.6665 7.12516 1.83273 6.30181 2.16517 5.53105C2.49762 4.76029 2.94878 4.08983 3.51867 3.51969C4.08857 2.94953 4.75873 2.49816 5.52915 2.16557C6.29956 1.83298 7.12275 1.66669 7.9987 1.66669C8.87466 1.66669 9.69802 1.83291 10.4688 2.16535C11.2395 2.4978 11.91 2.94896 12.4801 3.51885C13.0503 4.08875 13.5017 4.75892 13.8343 5.52934C14.1668 6.29975 14.3331 7.12293 14.3331 7.99889C14.3331 8.87484 14.1669 9.6982 13.8345 10.469C13.502 11.2397 13.0509 11.9102 12.481 12.4803C11.9111 13.0505 11.2409 13.5018 10.4705 13.8344C9.70008 14.167 8.87689 14.3333 8.00094 14.3333ZM7.99982 13.3333C9.48871 13.3333 10.7498 12.8167 11.7832 11.7833C12.8165 10.75 13.3332 9.48889 13.3332 8C13.3332 6.51112 12.8165 5.25 11.7832 4.21667C10.7498 3.18334 9.48871 2.66667 7.99982 2.66667C6.51093 2.66667 5.24982 3.18334 4.21649 4.21667C3.18315 5.25 2.66649 6.51112 2.66649 8C2.66649 9.48889 3.18315 10.75 4.21649 11.7833C5.24982 12.8167 6.51093 13.3333 7.99982 13.3333Z" fill="#B91C1C"/>
              </g>
            </svg>
            <div className={classes.supportingText2}>Please enter email address</div>
          </div>
      )}
      {/*{props.errors && props.errors[props.name]?.type === "required" && (*/}
      {/*  <span className="error">{props.errors[props.name]?.message}</span>*/}
      {/*)}*/}
      {/*{props.errors && props.errors[props.name]?.type === "minLength" && (*/}
      {/*  <span className="error">{props.errors[props.name]?.message}</span>*/}
      {/*)}*/}
    </div>
  );
});
