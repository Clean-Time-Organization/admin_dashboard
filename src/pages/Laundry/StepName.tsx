import { FC} from "react";
import { BasicButtonLong} from "../../components/Button/Buttons";
import {Control, Controller, UseFormWatch} from "react-hook-form";
import {BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle, Titles } from "./styled";
import {LaundryForm} from "./CreateLaundry";
import {InputBase} from "../../components/InputBase/InputBase";

interface IStepLaundryInfoProps {
  readonly control: Control<LaundryForm>
  readonly watch: UseFormWatch<LaundryForm>
  toNextStep: () => void
}

const StepName: FC<IStepLaundryInfoProps> = ({
  control,
  watch,
  toNextStep,
}) => {
  const nameEn = watch('name_en')

  const handleNextStep = () => {
    if (nameEn.trim()) {
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
            label={'Laundry Name (EN)'}
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
      <Controller
        control={control}
        name="name_ar"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <InputBase
            dir="rtl"
            label={'Laundry Name (AR)'}
            error={error !== undefined}
            errorText={error?.type === 'required' && 'Field is required' ||
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
