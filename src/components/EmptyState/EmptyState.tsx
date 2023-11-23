import { FC } from "react";
import { EmptyStateBase, EmptyStateContainer, EmptyStateSubtitle, EmptyStateTitle } from "./styled";
import { BasicButton } from "../Button/Buttons";
import { Plus } from "../Icons/Plus";
import { EmptyStateIcon } from "../Icons/EmptyStateIcon";

interface IEmptyStateProps {
  title: string;
  subtitle?: string;
  buttonName?: string;
  buttonAction?: () => void;
}

const EmptyState: FC<IEmptyStateProps> = ({
  title,
  subtitle,
  buttonName,
  buttonAction,
}) => {
  return <EmptyStateContainer>
    <EmptyStateBase>
      <EmptyStateIcon />
      <EmptyStateTitle>{title}</EmptyStateTitle>
      {
        subtitle && <EmptyStateSubtitle>{subtitle}</EmptyStateSubtitle>
      }
      {
        buttonName && buttonAction &&
          <BasicButton onClick={buttonAction} preTextIcon={<Plus />} pretext="true">
            {buttonName}
          </BasicButton>
      }
    </EmptyStateBase>
  </EmptyStateContainer>;
}

export { EmptyState };
