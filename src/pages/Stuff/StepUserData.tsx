import { FC } from "react";
import { BasicButton, LinkButton } from "../../components/Button/Buttons";
import { InputBase } from "../../components/InputBase/InputBase";
import { BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle } from "./styled";
import { Control, Controller, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { UserForm } from "../../types/user";
import { PasswordGeneration } from "../../components/PasswordGeneration/PasswordGeneration";
import { useAppDispatch } from "../../store/hooks";
import { setNotification } from "../../store/features/notification";

interface IStepUserDetailsProps {
  readonly control: Control<UserForm>;
  readonly watch: UseFormWatch<UserForm>;
  readonly setValue: UseFormSetValue<UserForm>;
  toPreviousStep: () => void;
  onCreate: () => void;
  // readonly getValues: UseFormGetValues<AgreementForm>;
  // readonly setError: UseFormSetError<AgreementForm>;
  // readonly clearError: UseFormClearErrors<AgreementForm>;
}

const StepUserDetails: FC<IStepUserDetailsProps> = ({
  control,
  watch,
  setValue,
  toPreviousStep,
  onCreate,
}) => {
  const dispatch = useAppDispatch();
  const watchPassword = watch('password');

  return <StepBase>
    <StepBaseInternal>
      <StepTitle>User data</StepTitle>
      <StepSubtitle>Enter the user's personal data and create a password</StepSubtitle>
    </StepBaseInternal>
    <StepBaseInternal>
      <BlockTitle>Personal Info</BlockTitle>
      <BlockSubtitle>Provide Personal Data of User</BlockSubtitle>
      <Controller
        control={control}
        name="full_name"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
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
            minLength: 2,
            maxLength: 80,
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <InputBase
                label={'Email'}
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
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Incorrect format',
            },
        }}
      />
      <Controller
        control={control}
        name="phone_number"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <InputBase
                label={'Phone Number'}
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
            pattern: {
              value: /^\d{9}$/,
              message: 'Incorrect phone format',
            },
            minLength: {
              value: 9,
              message: 'Invalid phone'
            },
            maxLength: {
              value: 9,
              message: 'Invalid phone'
            },
        }}
      />
    </StepBaseInternal>
    <StepBaseInternal>
      <BlockTitle>Create Password</BlockTitle>
      <BlockSubtitle>Create Password for User</BlockSubtitle>
      <Controller
        control={control}
        name="password"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <PasswordGeneration
            label={'Password'}
            error={!!error}
            copyFunction={() => {
              navigator.clipboard.writeText(watchPassword);
              dispatch(setNotification({
                notificationMessage: 'Password copied',
                notificationType: 'success',
              }));
            }}
            currentValue={watchPassword}
            setValue={(val: string) => setValue('password', val)}
            errorText={error?.type === 'required' && 'Field is required' ||
              error?.message || ''
            }
            {...field}
          />
        )}
        rules={{
          required: true,
          pattern: {
            value: /^\S*$/,
            message: 'Password should not contain spaces',
          },
          minLength: {
            value: 8,
            message: 'Too short value'
          },
          maxLength: {
            value: 150,
            message: 'Too long value'
          },
      }}
      />
    </StepBaseInternal>
    <ButtonLine>
      <LinkButton onClick={toPreviousStep}>Previous step</LinkButton>
      <BasicButton onClick={onCreate}>Create staff user</BasicButton>
    </ButtonLine>
  </StepBase>;
}

export { StepUserDetails };
