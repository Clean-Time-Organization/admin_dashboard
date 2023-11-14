import { FC, useRef, useState } from "react";
import { LinkButton } from "../Button/Buttons";
import { IInputBaseProps, InputBase } from "../InputBase/InputBase";
import { PasswordGenerationBody } from "./styled";

type IPasswordGenerationProps = IInputBaseProps & {
  copyFunction?: () => void;
  setValue?: (val: string) => void;
  currentValue?: string;
};

const PasswordGeneration: FC<IPasswordGenerationProps> = ({
  copyFunction,
  setValue,
  currentValue,
  ...props
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const generatePassword = () => {
    if (setValue) {
      setFocused(true);
      
      setValue((Math.random() + 1).toString(36).substring(2, 10));
    }
  };

  function handleClickOutside(e: any) {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      if (focused) {
        setFocused(false);
      }
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return <PasswordGenerationBody>
    <InputBase
      inputRef={inputRef}
      copyData={() => copyFunction && copyFunction()}
      value={currentValue}
      {...props}
    />
    <LinkButton onClick={generatePassword} style={{ height: '56px' }}>Generate</LinkButton>
  </PasswordGenerationBody>;
}

export { PasswordGeneration };
