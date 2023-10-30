import { FC } from 'react';
import { BasicButton, LinkButton } from '../Button/Buttons';
import { Export } from '../Icons/Export';
import { Plus } from '../Icons/Plus';
import {
  TitleBody,
  TitleLeftSide,
  TitleRightSide,
  TitleName,
} from './styled';

interface IPageTitleProps {
  name: string;
  createButtonName?: string;
  createButtonClick?: () => void;
  exportButtonName?: string;
  exportButtonClick?: () => void;
}

const PageTitle: FC<IPageTitleProps> = ({
  name,
  createButtonName,
  createButtonClick,
  exportButtonName,
  exportButtonClick,
}) => {
  return <TitleBody>
    <TitleLeftSide>
      <TitleName>{name}</TitleName>
    </TitleLeftSide>
    <TitleRightSide>
      {
        (exportButtonName && exportButtonClick) &&
          <LinkButton onClick={exportButtonClick} preTextIcon={<Export />} pretext={true}>
            {exportButtonName}
          </LinkButton>
      }
      {
        (createButtonName && createButtonClick) &&
          <BasicButton onClick={createButtonClick} preTextIcon={<Plus />} pretext={true}>
            {createButtonName}
          </BasicButton>
      }
    </TitleRightSide>
  </TitleBody>;
}

export { PageTitle };