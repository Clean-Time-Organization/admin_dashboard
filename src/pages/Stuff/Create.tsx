import { useNavigate } from "react-router-dom";
import { CreationPanel } from "../../components/CreationPanel/CreationPanel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserForm } from "../../types/user";
import { StepRole } from "./StepRole";
import { StepUserDetails } from "./StepUserData";

const CreateStuffUser = () => {
  const navigate = useNavigate();
  const [totalSteps, setTotalSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(1);

  const { control, watch, setValue } = useForm<UserForm>({
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
            <StepUserDetails control={control} watch={watch} setValue={setValue} toPreviousStep={() => setCurrentStep(currentStep - 1)} /> :
            <></>
          )
      }
      {
        currentStep === 3 &&
          watchRole === 'POS' &&
            <StepUserDetails control={control} watch={watch} setValue={setValue} toPreviousStep={() => setCurrentStep(currentStep - 1)} />
      }
    </>
  </CreationPanel>
}

export { CreateStuffUser };
