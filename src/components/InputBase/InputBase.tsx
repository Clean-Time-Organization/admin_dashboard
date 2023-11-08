import { FormControl, IconButton, InputAdornment, TextField, TextFieldProps, styled } from "@mui/material";
import { FC } from "react";
import { Alert } from "../Icons/Alert";
import { ContentCopy } from "@mui/icons-material";

export type IInputBaseProps = TextFieldProps & {
  label?: string;
  error?: boolean;
  errorText?: string;
  copyData?: () => void;
}

const ErrorMessage = styled('div')`
  padding: 5px 0;
  display: flex;
  gap: 5px;
  color: #B91C1C;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
  align-items: center;
`;

const InputBase: FC<IInputBaseProps> = ({
  label,
  error,
  errorText,
  copyData,
  ...inputProps
}) => {
  return <FormControl error={error} style={{ width: '100%' }}>
    <TextField
      label={label}
      fullWidth
      error={!!error}
      variant="outlined"
      {...inputProps}
      InputProps={{
        endAdornment:
          copyData ? 
            <InputAdornment
              position="end"
              style={{
                color: '#2E8DC8',
              }}
              classes={{
                positionEnd: "0px",
              }}>
              <IconButton
                aria-label="copy data"
                onClick={copyData}
                onMouseDown={copyData}
                edge="end"
                style={{ color: '#2E8DC8' }}
              >
                <ContentCopy />
              </IconButton>
            </InputAdornment> : <></>,
      }}
      sx={{
        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
          width: "85%"
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#D1D5DB",
          },
          '&.Mui-focused fieldset': {
            borderColor: "#2E8DC8",
          },
        },
      }}
    />
    {error ?
      <ErrorMessage>
        <Alert />
        <span>{errorText}</span>
      </ErrorMessage>
    : null}
  </FormControl>;
}

export { InputBase };
