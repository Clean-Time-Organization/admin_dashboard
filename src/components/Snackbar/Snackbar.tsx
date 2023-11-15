import { FC } from "react";
import { SnackbarBase } from "./styled";
import { Success } from "../Icons/Success";
import { Error } from "../Icons/Error";

interface ISnackbarProps {
  text: string;
  type: 'success' | 'error';
}

const Snackbar: FC<ISnackbarProps> = ({
  text,
  type,
}) => {
  return <SnackbarBase
    sx={{
      zIndex: 5000,
    }}
  >
    {
      type === 'success' ?
        <Success /> :
        <Error />
    }
    <div>{text}</div>
  </SnackbarBase>;
}

export { Snackbar };
