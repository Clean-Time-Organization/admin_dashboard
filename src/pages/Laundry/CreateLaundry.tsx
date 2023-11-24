import { useNavigate } from "react-router-dom";
import { CreationPanel } from "../../components/CreationPanel/CreationPanel";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import httpClient from "../../services/HttpClient";
import { useAppDispatch } from "../../store/hooks";
import { setNotification } from "../../store/features/notification";
import {StepName} from "./StepName";
import {StepOwner} from "./StepOwner";
import {StepTaxInfo} from "./StepTaxInfo";

export type LaundryForm = {
  name_en: string
  name_ar: string
  full_name: string
  address: string
  phone_number: string
  vat_number: number
  cr_number: number
}

const CreateLaundry = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [totalSteps, setTotalSteps] = useState(3)
  const [currentStep, setCurrentStep] = useState(1)

  const { control, watch, setValue, handleSubmit, setError, trigger, formState: {errors} } = useForm<LaundryForm>({
    mode: 'onTouched',
    defaultValues: {
      name_en: '',
      name_ar: '',
      full_name: '',
      phone_number: '',
      address: '',
    },
  })

  const cancelEvent = () => {
    navigate('/laundries')
  }

  const handleCreate: SubmitHandler<LaundryForm> = async (values) => {
    await httpClient.post(
      '/laundry',
      {...values, phone_number: '+966' + values.phone_number},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then(response => {
      if (response.status === 200) {
        navigate('/staff');
        dispatch(setNotification({
          notificationMessage: 'Laundry is successfully created',
          notificationType: 'success',
        }))
      }
    }).catch(error => {
      console.dir(error)
      // if (error.response.data.detail instanceof Array) {
      //   error.response.data.detail.forEach((item: any) => {
      //     setError(item.loc[1], { type: 'validate', message: item.msg + ''} )
      //   });
      // } else if (Object.keys(error.response.data.detail)[0] === 'email') {
      //   setError('email', { type: 'validate', message: Object.values(error.response.data.detail)[0] + ''} )
      // } else if (Object.keys(error.response.data.detail)[0] === 'full_name') {
      //   setError('full_name', { type: 'validate', message: Object.values(error.response.data.detail)[0] + ''} )
      // } else if (Object.keys(error.response.data.detail)[0] === 'phone_number') {
      //   setError('phone_number', { type: 'validate', message: Object.values(error.response.data.detail)[0] + ''} )
      // } else {
      //   dispatch(setNotification({
      //     notificationMessage: error.response.data.detail + '',
      //     notificationType: 'error',
      //   }))
      // }
      // then - else => set global error message if smth went wrong, otherwise - success
    })
  }

  return <CreationPanel
    stepperTitle="Create Laundry"
    totalSteps={totalSteps}
    currentStep={currentStep}
    cancelEvent={cancelEvent}
  >
    <>
      {
        currentStep === 1 &&
          <StepName
            control={control}
            errors={errors}
            trigger={trigger}
            toNextStep={() => setCurrentStep(currentStep + 1)}
          />
      }
      {
        currentStep === 2 &&
          <StepOwner
            control={control}
            errors={errors}
            trigger={trigger}
            toPreviousStep={() => setCurrentStep(currentStep - 1)}
            toNextStep={() => setCurrentStep(currentStep + 1)}
          />
      }
      {
        currentStep === 3 &&
          <StepTaxInfo
            control={control}
            errors={errors}
            trigger={trigger}
            toPreviousStep={() => setCurrentStep(currentStep - 1)}
            onCreate={handleSubmit(handleCreate)}
          />
      }
    </>
  </CreationPanel>
}

export { CreateLaundry }
