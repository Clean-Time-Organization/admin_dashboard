import { useNavigate } from "react-router-dom";
import { CreationPanel } from "../../components/CreationPanel/CreationPanel";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserForm } from "../../types/user";
import { StepRole } from "./StepRole";
import { StepUserDetails } from "./StepUserData";
import httpClient from "../../services/HttpClient";
import { StepLaundryInfo } from "./StepLaundryInfo";
import { useAppDispatch } from "../../store/hooks";
import { setNotification } from "../../store/features/notification";

const CreateStuffUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [totalSteps, setTotalSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(1);

  const { control, watch, setValue, handleSubmit, setError } = useForm<UserForm>({
    mode: 'onTouched',
    defaultValues: {
        role: 'POS',
        password: '',
    },
  });

  const watchRole = watch('role');

  const roleProperties = [
    {
      id: 'POS',
      name: 'Operator POS',
      subtitle: 'An online learning platform offering courses, webinars, and resources on modern farming techniques, ' +
        'sustainable agriculture practices, and the latest technologies in the agricultural industry.',
    },
    {
      id: 'Admin',
      name: 'Admin',
      subtitle: 'An online learning platform offering courses, webinars, and resources on modern farming techniques, ' +
        'sustainable agriculture practices, and the latest technologies in the agricultural industry.',
    },
  ];

  useEffect(() => {
    if (watchRole === 'POS') {
      setTotalSteps(3);
    } else {
      setTotalSteps(2);
    }
  }, [watchRole]);

  const cancelEvent = () => {
    navigate('/staff');
  };

  const handleCreate: SubmitHandler<UserForm> = async (values) => {
    await httpClient.post(
      watchRole === 'Admin' ? '/user/admin?' : '/user/operator',
      {...values, phone_number: '+966' + values.phone_number}
    ).then(response => {
      if (response.status === 200) {
        navigate('/staff');
        dispatch(setNotification({
          notificationMessage: 'User is successfully created',
          notificationType: 'success',
        }));
      }
    }).catch(error => {
      if (Object.keys(error.response.data.detail)[0] === 'email') {
        setError('email', { type: 'validate', message: Object.values(error.response.data.detail)[0] + ''} );
      } else if (Object.keys(error.response.data.detail)[0] === 'full_name') {
        setError('full_name', { type: 'validate', message: Object.values(error.response.data.detail)[0] + ''} );
      } else if (Object.keys(error.response.data.detail)[0] === 'phone_number') {
        setError('phone_number', { type: 'validate', message: Object.values(error.response.data.detail)[0] + ''} );
      } else {
        dispatch(setNotification({
          notificationMessage: error.response.data.detail + '',
          notificationType: 'error',
        }));
      }
      // then - else => set global error message if smth went wrong, otherwise - success
    });
  };

  return <CreationPanel
    stepperTitle="Create Staff User"
    totalSteps={totalSteps}
    currentStep={currentStep}
    cancelEvent={cancelEvent}
  >
    <>
      {
        currentStep === 1 &&
          <StepRole list={roleProperties} setValue={setValue} selectedValue={watchRole} setCurrentStep={() => setCurrentStep(currentStep + 1)} />
      }
      {
        currentStep === 2 &&
          (watchRole === 'Admin' ?
            <StepUserDetails
              control={control}
              watch={watch}
              setValue={setValue}
              toPreviousStep={() => setCurrentStep(currentStep - 1)}
              onCreate={handleSubmit(handleCreate)}
            /> :
            <StepLaundryInfo
              control={control}
              watch={watch}
              setValue={setValue}
              toPreviousStep={() => setCurrentStep(currentStep - 1)}
              toNextStep={() => setCurrentStep(currentStep + 1)}
            /> 
          )
      }
      {
        currentStep === 3 &&
          watchRole === 'POS' &&
            <StepUserDetails
              control={control}
              watch={watch}
              setValue={setValue}
              toPreviousStep={() => setCurrentStep(currentStep - 1)}
              onCreate={handleSubmit(handleCreate)}
            />
      }
    </>
  </CreationPanel>
}

export { CreateStuffUser };
