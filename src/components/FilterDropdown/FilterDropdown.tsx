import { FC, useEffect, useRef, useState } from 'react';
import { DropdownBody, DropdownPanel, DropdownPanelButtons } from './styled';
import {FormControlLabel, Radio, RadioGroup, Typography} from '@mui/material';
import { BasicButton, LinkButton } from '../Button/Buttons';
import { ArrowDownSmall, ArrowUpSmall } from '../Icons/ArrowsSmall';

interface IFilterDropdownProps {
  name: string;
  properties: Array<{ id: number | string | boolean; name: string }>;
  selectedProperty: number | string | boolean | undefined;
  selectProperty?: (value: number | string | boolean | undefined) => void;
}

const FilterDropdown: FC<IFilterDropdownProps> = ({
  name,
  properties,
  selectedProperty,
  selectProperty,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<{ id: number | string | boolean; name: string }>();
  const [isOpen, setOpen] = useState(false);
  const dropdownComponent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedPoint(
      selectedProperty !== undefined ? properties.find(item => item.id === selectedProperty) : undefined
    )
  }, [selectedProperty]);

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
      selected={(selectedPoint !== undefined) || isOpen}
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
                    key={item.id + item.name}
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{
                          fontFamily: "Anek Latin"
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    checked={selectedPoint !== undefined && item.id === selectedPoint.id}
                  />
                )
              }
            </RadioGroup>
            <DropdownPanelButtons>
              <LinkButton style={{width: "72px", height: "32px"}} onClick={(e) => handleClose(e, false)}>Cancel</LinkButton>
              <BasicButton style={{width: "128px", height: "32px"}} onClick={(e) => handleClose(e, true)}>Show results</BasicButton>
            </DropdownPanelButtons>
          </DropdownPanel>
      }
    </DropdownBody>);
}

export { FilterDropdown };
