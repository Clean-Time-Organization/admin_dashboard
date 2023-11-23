import { FC} from "react";
import { BasicButtonLong} from "../../components/Button/Buttons";
import {Control, Controller, UseFormSetError, UseFormWatch} from "react-hook-form";
import {BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle, Titles } from "./styled";
import {LaundryForm} from "./CreateLaundry";
import {InputBase} from "../../components/InputBase/InputBase";

interface IStepLaundryInfoProps {
  readonly control: Control<LaundryForm>
  readonly watch: UseFormWatch<LaundryForm>
  readonly setError: UseFormSetError<LaundryForm>
  toNextStep: () => void
}

const StepName: FC<IStepLaundryInfoProps> = ({
  control,
  watch,
  setError,
  toNextStep,
}) => {
  const nameEn = watch('name_en')

  const handleNextStep = () => {
    if (nameEn.trim()) {
      toNextStep()
    } else {
      setError('name_en', {type: 'validate', message: 'Please enter laundry name'} )
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
