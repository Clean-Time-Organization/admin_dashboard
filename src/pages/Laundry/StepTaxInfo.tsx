import { FC} from "react";
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
  onCreate: () => void
}

const StepTaxInfo: FC<IStepLaundryInfoProps> = ({control, errors, trigger, toPreviousStep, onCreate}) => {
  const handleNextStep = () => {
    trigger()
    const stepFields = ['vat_number', 'cr_number']
    const errorFields = Object.keys(errors)
    let stepIsValid = !stepFields.some(item => errorFields.includes(item))

    if (stepIsValid) {
      onCreate()
    }
  }

  return <StepBase>
    <StepBaseInternal>
      <StepTitle>Tax Info</StepTitle>
      <StepSubtitle>Provide financial information and attach files</StepSubtitle>
    </StepBaseInternal>
    <StepBaseInternal>
      <Titles>
        <BlockTitle>Vat Number</BlockTitle>
        <BlockSubtitle>Please indicate the VAT number for the laundry. Upload a file up to 10 MB.</BlockSubtitle>
      </Titles>
      <Controller
        control={control}
        name="vat_number"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <InputBase
            autoFocus
            label={'VAT Number'}
            error={error !== undefined}
            errorText={error?.type === 'required' && 'Please enter the VAT Number' ||
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
      <Titles>
        <BlockTitle>CR Number</BlockTitle>
        <BlockSubtitle>Please indicate the CR number for the laundry. Upload a file up to 10 MB.</BlockSubtitle>
      </Titles>
      <Controller
        control={control}
        name="cr_number"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <InputBase
            label={'CR Number'}
            error={error !== undefined}
            errorText={error?.type === 'required' && 'Please enter the CR Number' ||
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
      <BasicButtonLong onClick={onCreate}>Create laundry</BasicButtonLong>
    </ButtonLine>
  </StepBase>;
}

export { StepTaxInfo }
