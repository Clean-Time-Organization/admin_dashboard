import {FC, useEffect} from "react";
import {BasicButtonLong, LinkButtonLong} from "../../components/Button/Buttons";
import {Control, Controller, UseFormTrigger, UseFormWatch} from "react-hook-form";
import {BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle, Titles } from "./styled";
import {LaundryForm} from "./CreateLaundry";
import {InputBase} from "../../components/InputBase/InputBase";
import {FieldErrors} from "react-hook-form/dist/types/errors";

interface IStepLaundryInfoProps {
  readonly control: Control<LaundryForm>
  readonly errors: FieldErrors<any>
  readonly trigger: UseFormTrigger<LaundryForm>
  toPreviousStep: () => void
  toNextStep: () => void
}

const StepOwner: FC<IStepLaundryInfoProps> = (
  {
    control,
    errors,
    trigger,
    toPreviousStep,
    toNextStep,
  }) => {
  const handleNextStep = async () => {
    await trigger('full_name')
    await trigger('phone_number')
    await trigger('address')

    const stepFields = ['full_name', 'phone_number', 'address']
    const errorFields = Object.keys(errors)
    let stepIsValid = !stepFields.some(item => errorFields.includes(item))

    if (stepIsValid) {
      toNextStep()
    }
  }

  return <StepBase>
    <StepBaseInternal>
      <StepTitle>Basic Info</StepTitle>
      <StepSubtitle>Provide information about the laundry, including contact information</StepSubtitle>
    </StepBaseInternal>
    <StepBaseInternal>
      <Titles>
        <BlockTitle>Contact Info</BlockTitle>
        <BlockSubtitle>Provide contact details of the laundry</BlockSubtitle>
      </Titles>
      <Controller
        control={control}
        name="full_name"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <InputBase
            autoFocus
            label={'Laundry Owner'}
            error={error !== undefined}
            errorText={error?.type === 'required' && 'Please enter the laundry owner name' ||
              error && error?.message
            }
            autoComplete={'off'}
            {...field}
          />
        )}
        rules={{
          required: true,
          minLength: {
            value: 2,
            message: 'Min length must be 2 symbols'
          },
          maxLength: {
            value: 80,
            message: 'Max length must be 80 symbols'
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
      <Controller
        control={control}
        name="address"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <InputBase
            label={'Address'}
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
        }}
      />
    </StepBaseInternal>
    <ButtonLine>
      <LinkButtonLong onClick={toPreviousStep}>Previous step</LinkButtonLong>
      <BasicButtonLong onClick={handleNextStep}>Continue</BasicButtonLong>
    </ButtonLine>
  </StepBase>;
}

export { StepOwner }
