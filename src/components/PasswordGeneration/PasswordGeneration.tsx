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
  const generatePassword = () => {
    if (setValue) {
      setValue((Math.random() + 1).toString(36).substring(2, 10));
    }
  };

  return <PasswordGenerationBody>
    <InputBase
      copyData={() => copyFunction && copyFunction()}
      value={currentValue}
      {...props}
    />
    <LinkButton onClick={generatePassword} style={{ height: '56px' }}>Generate</LinkButton>
  </PasswordGenerationBody>;
}

export { PasswordGeneration };
