import { FC } from "react";
import { BasicButton, LinkButton } from "../../components/Button/Buttons";
import { InputBase } from "../../components/InputBase/InputBase";
import { BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle } from "./styled";
import { Control, Controller, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { UserForm } from "../../types/user";
import { PasswordGeneration } from "../../components/PasswordGeneration/PAsswordGeneration";

interface IStepLaundryInfoProps {
  readonly control: Control<UserForm>;
  readonly watch: UseFormWatch<UserForm>;
  readonly setValue: UseFormSetValue<UserForm>;
  toPreviousStep: () => void;
  toNextStep: () => void;
  // readonly getValues: UseFormGetValues<AgreementForm>;
  // readonly setError: UseFormSetError<AgreementForm>;
  // readonly clearError: UseFormClearErrors<AgreementForm>;
}

const StepLaundryInfo: FC<IStepLaundryInfoProps> = ({
  control,
  watch,
  setValue,
  toPreviousStep,
  toNextStep,
}) => {
  const watchPassword = watch('password');

  return <StepBase>
    <StepBaseInternal>
      <StepTitle>Laundry Info</StepTitle>
      <StepSubtitle>Choose a laundry and brunch</StepSubtitle>
    </StepBaseInternal>
    <StepBaseInternal>
      <BlockTitle>Select Laundry</BlockTitle>
      <BlockSubtitle>Choose the laundry where this user works</BlockSubtitle>
      <Controller
        control={control}
        name="full_name"
        render={({ field, fieldState: { error } }) => (
            <InputBase
                label={'Full Name'}
                error={error !== undefined}
                errorText={error?.type === 'required' && 'Field is required' ||
                  error && error?.message  
                }
                autoComplete={'off'}
                {...field}
            />
        )}
        rules={{
            required: true,
            minLength: 1,
        }}
      />
    </StepBaseInternal>
    <StepBaseInternal>
      <BlockTitle>Select Branch</BlockTitle>
      <BlockSubtitle>Select the brunch address</BlockSubtitle>
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <PasswordGeneration
            label={'Password'}
            error={!!error}
            copyFunction={() => navigator.clipboard.writeText(watchPassword)}
            currentValue={watchPassword}
            setValue={(val: string) => setValue('password', val)}
            errorText={error?.message || ''}
            {...field}
          />
        )}
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: 'Too short value'
          },
      }}
      />
    </StepBaseInternal>
    <ButtonLine>
      <LinkButton onClick={toPreviousStep}>Previous step</LinkButton>
      <BasicButton onClick={toNextStep}>Continue</BasicButton>
    </ButtonLine>
  </StepBase>;
}

export { StepLaundryInfo };
