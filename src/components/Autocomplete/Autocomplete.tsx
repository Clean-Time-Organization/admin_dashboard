import { FC, useEffect, useState, } from "react";
import { FormControl, Autocomplete as MuiAutocomplete, TextField, TextFieldProps, styled } from '@mui/material';
import { Alert } from "../Icons/Alert";

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

type IAutocompleteProps = TextFieldProps & {
  label?: string;
  error?: boolean;
  errorText?: string;
  options: Array<{ id: number; name: string }>;
  selectedValue: { id: number; name: string } | null;
  selectValue: (val: { id: number; name: string } | null) => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const Autocomplete: FC<IAutocompleteProps> = ({
  label,
  error,
  errorText,
  options,
  selectedValue,
  selectValue,
  inputValue,
  setInputValue,
  open,
  setOpen,
  ...inputProps
}) => {
  const [list, setList] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    if (!open) {
      setList([]);
    } else {
      setList(options);
    }
  }, [open]);

  return (
    <FormControl error={error} style={{ width: '100%' }}>
      <MuiAutocomplete
        value={selectedValue}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        style={{ width: '100%', borderColor: error ? 'red' : 'rgba(0, 0, 0, 0.87)' }}
        onChange={(event: any, newValue: { id: number; name: string } | null) => {
          selectValue(newValue);
        }}
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={list}
        getOptionLabel={(option: { id: number; name: string }) => `${option.name}`}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          )
        }}
        renderInput={(params) =>
          <TextField
            {...params}
            error={error}
            label={label}
            {...inputProps}
            style={{
              color: '#4B5563',
            }}
          />
        }
      />
      {error ?
        <ErrorMessage>
          <Alert />
          <span>{errorText}</span>
        </ErrorMessage>
        : null}
    </FormControl>
  );
}

export { Autocomplete };
