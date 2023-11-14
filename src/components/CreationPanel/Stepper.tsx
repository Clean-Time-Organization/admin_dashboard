import { FC } from "react";
import { StepperBase, StepperHead, StepperHeadSteps, StepperHeadTitle, StepperLine, StepperLineProgress } from "./styled";

interface IStepperProps {
  title: string;
  totalSteps: number;
  currentStep: number;
}

const Stepper: FC<IStepperProps> = ({
  title,
  totalSteps,
  currentStep,
}) => {
  return <StepperBase>
    <StepperHead>
      <StepperHeadTitle>{title}</StepperHeadTitle>
      <StepperHeadSteps>
        Step&nbsp;{currentStep}&nbsp;<span>of&nbsp;{totalSteps}</span>
      </StepperHeadSteps>
    </StepperHead>
    <StepperLine>
      <StepperLineProgress total={totalSteps} current={currentStep} />
    </StepperLine>
  </StepperBase>;
}

export { Stepper };
