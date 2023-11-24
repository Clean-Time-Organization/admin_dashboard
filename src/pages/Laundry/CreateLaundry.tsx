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
  vat_file: Blob
  cr_file: Blob
}

const CreateLaundry = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [totalSteps, setTotalSteps] = useState(3)
  const [currentStep, setCurrentStep] = useState(1)
  const [vatFile, setVatFile] = useState(new Blob())
  const [crFile, setCrFile] = useState(new Blob())

  const { control, watch, setValue, handleSubmit, setError, trigger, register, formState: {errors} } = useForm<LaundryForm>({
    mode: 'onTouched',
    defaultValues: {
      name_en: '',
      name_ar: '',
      full_name: '',
      phone_number: '',
      address: '',
      vat_number: 0,
      cr_number: 0,
    },
  })

  const cancelEvent = () => {
    navigate('/laundries')
  }

  const handleCreate: SubmitHandler<LaundryForm> = async (values) => {
    console.log('123123')
    const formData = new FormData()

    formData.append("name_en", values.name_en)
    formData.append("name_ar", values.name_ar)
    formData.append("full_name", values.full_name)
    formData.append("phone_number", '+966' + values.phone_number)
    formData.append("address", values.address)
    formData.append("vat_number", values.vat_number.toString())
    formData.append("cr_number", values.cr_number.toString())

    formData.append("vat_file", vatFile)
    formData.append("cr_file", crFile)

    console.dir(values)

    if (vatFile.size > 10 * 1024 * 1024 || crFile.size > 10 * 1024 * 1024) {
      dispatch(setNotification({
        notificationMessage: 'Your file exceeds our limit of 10 Mb',
        notificationType: 'error',
      }))
    } else {
      await httpClient.post(
        '/laundry/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
        if (response.status === 200) {
          navigate('/laundries');
          dispatch(setNotification({
            notificationMessage: 'Laundry is successfully created',
            notificationType: 'success',
          }))
        }
      }).catch(error => {
        if (error.response.data.detail instanceof Array) {
          error.response.data.detail.forEach((item: any) => {
            setError(item.loc[1], {type: 'validate', message: item.msg + ''})
          })
        } else if (typeof(error.response.data.detail) === 'string') {
          dispatch(setNotification({
            notificationMessage: error.response.data.detail + '',
            notificationType: 'error',
          }))
        } else {
          const errorFields = Object.keys(error.response.data.detail)
          if (errorFields.includes('name_en')) {
            setError('name_en', { type: 'validate', message: error.response.data.detail.name_en} )
            setCurrentStep(1)
          } else if (errorFields.includes('full_name')) {
            setError('full_name', { type: 'validate', message: error.response.data.detail.full_name} )
            setCurrentStep(2)
          } else if (errorFields.includes('phone_number')) {
            setError('phone_number', { type: 'validate', message: error.response.data.detail.phone_number} )
            setCurrentStep(2)
          } else if (errorFields.includes('address')) {
            setError('address', { type: 'validate', message: error.response.data.detail.address} )
            setCurrentStep(3)
          }
        }
      })
    }
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
            register={register}
            setValue={setValue}
            setParentVatFile={setVatFile}
            setParentCrFile={setCrFile}
            toPreviousStep={() => setCurrentStep(currentStep - 1)}
            onCreate={handleSubmit(handleCreate)}
          />
      }
    </>
  </CreationPanel>
}

export { CreateLaundry }
