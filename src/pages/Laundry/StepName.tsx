import { FC} from "react";
import { BasicButtonLong} from "../../components/Button/Buttons";
import {Control, Controller} from "react-hook-form";
import {BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle, Titles } from "./styled";
import {LaundryForm} from "./CreateLaundry";
import {InputBase} from "../../components/InputBase/InputBase";
import {FieldErrors} from "react-hook-form/dist/types/errors";

interface IStepLaundryInfoProps {
  readonly control: Control<LaundryForm>
  readonly errors: FieldErrors<any>
  trigger: () => void
  toNextStep: () => void
}

const StepName: FC<IStepLaundryInfoProps> = ({control, errors, trigger, toNextStep}) => {
  const handleNextStep = () => {
    trigger()
    const stepFields = ['name_en']
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
        <BlockTitle>Laundry Name</BlockTitle>
        <BlockSubtitle>Provide the name of the laundry in English and Arabic</BlockSubtitle>
      </Titles>
      <Controller
        control={control}
        name="name_en"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <InputBase
            autoFocus
            label={'Laundry Name (EN)'}
            error={error !== undefined}
            errorText={error?.type === 'required' && 'Please enter laundry name' ||
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
      <Controller
        control={control}
        name="name_ar"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <InputBase
            dir="rtl"
            label={'Laundry Name (AR)'}
            error={error !== undefined}
            errorText={error?.type === 'required' && 'Please enter laundry name' ||
              error && error?.message
            }
            autoComplete={'off'}
            {...field}
          />
        )}
        rules={{
          // required: true,
        }}
      />
    </StepBaseInternal>
    <ButtonLine>
      <BasicButtonLong onClick={handleNextStep}>Continue</BasicButtonLong>
    </ButtonLine>
  </StepBase>;
}

export { StepName }
