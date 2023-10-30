import { useState, useRef } from "react";
import { SearchBody, SearchIcon } from "./styled";
import { Search as SearchImage } from '../Icons/Search';
import { Input } from "@mui/material";
import { Close } from "../Icons/Close";

const Search = () => {
  const searchComponent = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  function handleClickOutside(e: any) {
    if (searchComponent.current && !searchComponent.current.contains(e.target)) {
      if (focused) {
        setFocused(!focused);
      }
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return <SearchBody ref={searchComponent} focused={!!(focused || value)}>
    <SearchIcon onClick={() => setFocused(true)}>
      <SearchImage />
    </SearchIcon>
      {
        (focused || value) &&
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
      }
      {
        value &&
          <SearchIcon onClick={() => setValue('')}>
            <Close />
          </SearchIcon>
      }
  </SearchBody>;
}

export { Search };