import { FC, useEffect, useState } from "react";
import { AutocompleteProps, FormControl, Autocomplete as MuiAutocomplete, TextField, styled } from '@mui/material';
import { Alert } from "../Icons/Alert";
import httpClient from "../../services/HttpClient";

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

interface IAutocompleteProps {
  label?: string;
  error?: boolean;
  errorText?: string;
  params?: Array<{ key: string; value: string | number }>;
  dataEndpoint: string;
}

const Autocomplete: FC<IAutocompleteProps> = ({
  label,
  error,
  errorText,
  params,
  dataEndpoint,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getData();
  }, [inputValue]);

  const getData = async () => {
    const searchParams = new URLSearchParams();
    if (inputValue) {
      searchParams.append('name', inputValue);
    }
    if (params) {
      params.forEach(item => {
        searchParams.append(item.key, item.value + '')
      })
    }
    await httpClient.get(dataEndpoint + '?' + new URLSearchParams(searchParams)).then(response => {
      setUserList(response.data);
    });
  };

  return (
    <FormControl error={error} style={{ width: '100%' }}>
      <MuiAutocomplete
        value={selectedValue}
        onChange={(event: any, newValue: string | null) => {
          setSelectedValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} />}
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
