import { FC, useEffect, useState } from "react";
import {
  UseFormSetValue,
} from 'react-hook-form';
import { BigButtonGroup } from "../../components/BigButtonGroup/BigButonGroup";
import { UserForm } from "../../types/user";
import { ButtonLine, StepBase } from "./styled";
import { BasicButton } from "../../components/Button/Buttons";

interface IStepRoleProps {
  list: Array<{ id: string; name: string; subtitle?: string }>;
  setValue: UseFormSetValue<UserForm>;
  selectedValue: 'Admin' | 'POS';
  setCurrentStep: () => void;
}

const StepRole: FC<IStepRoleProps> = ({ list, setValue, selectedValue, setCurrentStep }) => {
  const [selected, setSelected] = useState<string>(selectedValue);

  useEffect(() => {
    if (selected && (selected === 'Admin' || selected === 'POS')) {
      setValue('role', selected);
    }
  }, [selected]);

  return <StepBase>
    <BigButtonGroup title={'Select Role of User'} list={list} selected={selected} setSelected={(val) => setSelected(val + '')} />
    <ButtonLine>
      <BasicButton onClick={setCurrentStep}>Continue</BasicButton>
    </ButtonLine>
  </StepBase>;
}

export { StepRole };