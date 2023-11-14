import { FC } from "react";
import { ButtonBase, ButtonBaseDescription, ButtonBaseHeader } from "./styled";

interface IDescriptionButtonProps {
  title: string;
  description?: string;
  selected?: boolean;
  click: () => void;
}

const DescriptionButton: FC<IDescriptionButtonProps> = ({
  title,
  description = '',
  selected = false,
  click,
}) => {
  return <ButtonBase onClick={() => click()} selected={selected}>
    <ButtonBaseHeader>{title}</ButtonBaseHeader>
    {
      description &&
        <ButtonBaseDescription>
          {description}
        </ButtonBaseDescription>
    }
  </ButtonBase>;
}

export { DescriptionButton };