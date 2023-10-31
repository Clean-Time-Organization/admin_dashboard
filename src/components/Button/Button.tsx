import { FC } from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface IButtonProps extends ButtonProps {
  preTextIcon?: JSX.Element;
  postTextIcon?: JSX.Element;
}

const Button: FC<IButtonProps> = ({
  preTextIcon,
  postTextIcon,
  children,
  ...inputProps
}) => {
  return <MuiButton {...inputProps}>
    {!!preTextIcon && preTextIcon}
    {children}
    {!!postTextIcon && postTextIcon}
  </MuiButton>
}

export { Button };
