import { FC, useRef, useState } from 'react';
import { DropdownBody, DropdownPanel, DropdownPanelButtons } from './styled';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { BasicButton, LinkButton } from '../Button/Buttons';
import { ArrowDownSmall, ArrowUpSmall } from '../Icons/ArrowsSmall';

interface IFilterDropdownProps {
  name: string;
  properties: Array<{ id: number | string | boolean; name: string }>;
  selectProperty?: (value: number | string | boolean | undefined) => void;
}

const FilterDropdown: FC<IFilterDropdownProps> = ({
  name,
  properties,
  selectProperty,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<{ id: number | string | boolean; name: string }>();
  const [isOpen, setOpen] = useState(false);
  const dropdownComponent = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if ((event.target as HTMLInputElement).value) {
      setSelectedPoint(
        properties.find(el => (el.id + '') === (event.target as HTMLInputElement).value)
      );
    }
  };

  const handleClose = (e: React.MouseEvent, isSetting: boolean) => {
    e.stopPropagation();
    setOpen(false);
    if (selectProperty && selectedPoint) {
      selectProperty(isSetting ? selectedPoint.id : undefined);
    }
    if (!isSetting) {
      setSelectedPoint(undefined);
    }
  };

  function handleClickOutside(e: any) {
    if (dropdownComponent.current && !dropdownComponent.current.contains(e.target)) {
      if (isOpen) {
        setOpen(!isOpen);
      }
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return (
    <DropdownBody
      ref={dropdownComponent}
      selected={!!selectedPoint || isOpen}
      onClick={() => setOpen(true)}
    >
      {name}
      {
        isOpen ?
          <ArrowUpSmall /> :
          <ArrowDownSmall />
      }
      {
        isOpen &&
          <DropdownPanel>
            <RadioGroup name={name} onChange={handleChange}>
              {
                properties.map(item =>
                  <FormControlLabel
                    value={item.id}
                    control={<Radio />}
                    label={item.name}
                    checked={selectedPoint && item.id === selectedPoint.id}
                  />
                )
              }
            </RadioGroup>
            <DropdownPanelButtons>
              <LinkButton onClick={(e) => handleClose(e, false)}>Cancel</LinkButton>
              <BasicButton onClick={(e) => handleClose(e, true)}>Show results</BasicButton>
            </DropdownPanelButtons>
          </DropdownPanel>
      }
    </DropdownBody>);
}

export { FilterDropdown };
