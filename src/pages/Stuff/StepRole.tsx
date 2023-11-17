import { FC, useEffect, useState } from "react";
import {
  UseFormSetValue,
} from 'react-hook-form';
import { BigButtonGroup } from "../../components/BigButtonGroup/BigButonGroup";
import { UserForm } from "../../types/user";
import { BasicButtonLong } from "../../components/Button/Buttons";
import { ButtonLine, StepBase, StepTitle } from "./styled";

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
    <StepTitle>Role</StepTitle>
    <BigButtonGroup title={'Select Role of User'} list={list} selected={selected} setSelected={(val) => setSelected(val + '')} />
    <ButtonLine>
      <BasicButtonLong onClick={setCurrentStep}>Continue</BasicButtonLong>
    </ButtonLine>
  </StepBase>;
}

export { StepRole };