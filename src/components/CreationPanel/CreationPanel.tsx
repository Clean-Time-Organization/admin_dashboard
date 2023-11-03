import { FC } from "react";
import { LinkButton } from "../Button/Buttons";
import { Close } from "../Icons/Close";
import { Stepper } from "./Stepper";
import { CreationPanelBase, CreationPanelBaseHeader, CreationPanelWorkSpace } from "./styled";

interface ICreationPanelProps {
  stepperTitle: string;
  totalSteps: number;
  currentStep: number;
  cancelEvent: () => void;
  children: JSX.Element;
}

const CreationPanel: FC<ICreationPanelProps> = ({
  stepperTitle,
  totalSteps,
  currentStep,
  cancelEvent,
  children,
}) => {
  return <CreationPanelBase>
    <CreationPanelBaseHeader>
      <LinkButton
        onClick={cancelEvent}
        preTextIcon={<Close />}
        pretext="true"
      >
        Cancel
      </LinkButton>
    </CreationPanelBaseHeader>
    <CreationPanelWorkSpace>
      <Stepper totalSteps={totalSteps} currentStep={currentStep} title={stepperTitle} />
      <div>{ children }</div>
    </CreationPanelWorkSpace>
  </CreationPanelBase>;
}

export { CreationPanel };