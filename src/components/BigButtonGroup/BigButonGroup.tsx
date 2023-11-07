import { FC, useState } from 'react';
import {
  GroupBody,
  GroupBodyTitle,
  GroupBodyList,
} from './styled';
import { DescriptionButton } from '../Button/DescriptionButton';

interface IBigButtonGroupProps {
  title?: string;
  list: Array<{ id: string | number | boolean; name: string; subtitle?: string }>;
  selected?: string | number | boolean;
  setSelected: (val: string | number | boolean) => void;
}

const BigButtonGroup: FC<IBigButtonGroupProps> = ({
  title,
  list,
  selected,
  setSelected,
}) => {
  return <GroupBody>
    { title && <GroupBodyTitle>{title}</GroupBodyTitle>}
    <GroupBodyList>
      {
        list.map(item =>
          <DescriptionButton
            key={item.id + item.name}
            title={item.name}
            description={item.subtitle}
            selected={selected !== undefined && item.id === selected}
            click={() => setSelected(item.id)}
          />
        )
      }
    </GroupBodyList>
  </GroupBody>;
}

export { BigButtonGroup };