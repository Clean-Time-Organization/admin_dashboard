import { useNavigate } from "react-router-dom";
import { CreationPanel } from "../../components/CreationPanel/CreationPanel";

const CreateStuffUser = () => {
  const navigate = useNavigate();

  const cancelEvent = () => {
    navigate('/staff');
  };

  return <CreationPanel
    stepperTitle="Create Staff User"
    totalSteps={2}
    currentStep={1}
    cancelEvent={cancelEvent}
  >
    <div>123</div>
  </CreationPanel>
}

export { CreateStuffUser };
