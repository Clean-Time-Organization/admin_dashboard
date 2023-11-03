import { useNavigate } from "react-router-dom";
import { CreationPanel } from "../../components/CreationPanel/CreationPanel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserForm } from "../../types/user";

const CreateStuffUser = () => {
  const navigate = useNavigate();
  const [totalSteps, setTotalSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(1);

  const { control, watch } = useForm<UserForm>({
    mode: 'onTouched',
    defaultValues: {
        role: 'POS',
    },
  });

  const watchRole = watch('role');

  const roleProperties = [
    {
      id: 'POS',
      name: 'Operator POS',
    },
    {
      id: 'Admin',
      name: 'Admin',
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
    <div>123</div>
  </CreationPanel>
}

export { CreateStuffUser };
