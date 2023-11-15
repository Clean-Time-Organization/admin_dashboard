import { FC, useEffect, useState } from "react";
import { BasicButton, LinkButton } from "../../components/Button/Buttons";
import { BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle } from "./styled";
import { Control, Controller, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Branch, Laundry, UserForm } from "../../types/user";
import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import httpClient from "../../services/HttpClient";

interface IStepLaundryInfoProps {
  readonly control: Control<UserForm>;
  readonly watch: UseFormWatch<UserForm>;
  readonly setValue: UseFormSetValue<UserForm>;
  toPreviousStep: () => void;
  toNextStep: () => void;
  // readonly getValues: UseFormGetValues<AgreementForm>;
  // readonly setError: UseFormSetError<AgreementForm>;
  // readonly clearError: UseFormClearErrors<AgreementForm>;
}

const StepLaundryInfo: FC<IStepLaundryInfoProps> = ({
  control,
  watch,
  setValue,
  toPreviousStep,
  toNextStep,
}) => {
  const watchLaundry = watch('laundry_id');
  const watchLaundryName = watch('laundry_name');
  const watchBranch = watch('branch_id');
  const watchBranchName = watch('branch_name');
  const [selectedLaundry, setSelectedLaundry] = useState<{ id: number; name: string } | null>(null);
  const [inputLaundry, setInputLaundry] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<{ id: number; name: string } | null>(null);
  const [inputBranch, setInputBranch] = useState('');
  const [laundries, setLaundries] = useState<Array<Laundry>>();
  const [branches, setBranches] = useState<Array<Branch>>();

  useEffect(() => {
    getLaundryData();
  }, [inputLaundry]);
  
  const getLaundryData = async () => {
    const searchParams = new URLSearchParams();
    if (inputLaundry) {
      searchParams.append('name', inputLaundry);
    }
    await httpClient.get('/laundry/search?' + new URLSearchParams(searchParams)).then(response => {
      setLaundries(response.data?.items);
    });
  };

  const setLaundryName = (value: string) => {
    console.log(value, inputLaundry);
    if (value === '') {
      if (inputLaundry) {
        setValue('branch_name', undefined);
        setValue('branch_id', undefined);
        setInputLaundry(value);
        setSelectedBranch(null);
      }
    } else {
      setInputLaundry(value);
    }
  };

  useEffect(() => {
    getBranchesData();
  }, [inputBranch, watchLaundry]);
  
  const getBranchesData = async () => {
    if (watchLaundry) {
      const searchParams = new URLSearchParams();
      if (inputBranch) {
        searchParams.append('name', inputBranch);
      }
      searchParams.append('laundry_id', watchLaundry + '');
      await httpClient.get('/laundry/branch/search?' + new URLSearchParams(searchParams)).then(response => {
        setBranches(response.data?.items);
      });
    } else {
      setBranches(undefined);
    }
  };

  useEffect(() => {
    if (selectedLaundry) {
      setValue('laundry_id', selectedLaundry.id);
      setValue('laundry_name', selectedLaundry.name);
      setValue('branch_id', undefined);
    } else {
      setValue('laundry_id', undefined);
      setValue('laundry_name', undefined);
    }
  }, [selectedLaundry]);

  useEffect(() => {
    if (selectedBranch) {
      setValue('branch_id', selectedBranch.id);
      setValue('branch_name', selectedBranch.name);
    }  else {
      setValue('branch_id', undefined);
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (watchLaundry) {
      setSelectedLaundry({ id: watchLaundry, name: watchLaundryName || '' });
      setInputLaundry(watchLaundryName || '');
      if (watchBranch) {
        setSelectedBranch({ id: watchBranch, name: watchBranchName || '' });
        setInputBranch(watchBranchName || '');
      }
    }
  }, []);

  return <StepBase>
    <StepBaseInternal>
      <StepTitle>Laundry Info</StepTitle>
      <StepSubtitle>Choose a laundry and brunch</StepSubtitle>
    </StepBaseInternal>
    <StepBaseInternal>
      <BlockTitle>Select Laundry</BlockTitle>
      <BlockSubtitle>Choose the laundry where this user works</BlockSubtitle>
      <Controller
        control={control}
        name="laundry_id"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <Autocomplete
                label={'Laundry'}
                error={error !== undefined}
                errorText={error?.type === 'required' && 'Field is required' ||
                  error && error?.message  
                }
                selectedValue={selectedLaundry}
                selectValue={setSelectedLaundry}
                inputValue={inputLaundry}
                setInputValue={setLaundryName}
                options={laundries?.map((laundry: Laundry) => {return { id: laundry.id, name: laundry.name_en || '' }}) || []}
                {...field}
            />
        )}
        rules={{
            required: true,
        }}
      />
    </StepBaseInternal>
    <StepBaseInternal>
      <BlockTitle>Select Branch</BlockTitle>
      <BlockSubtitle>Select the brunch address</BlockSubtitle>
      <Controller
        control={control}
        name="branch_id"
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
              label={'Branch'}
              error={error !== undefined}
              errorText={error?.type === 'required' && 'Field is required' ||
                error && error?.message  
              }
              selectedValue={selectedBranch}
              selectValue={setSelectedBranch}
              inputValue={inputBranch}
              setInputValue={setInputBranch}
              disabled={!watchLaundry}
              options={watchLaundry ?
                branches?.map((branch: Branch) => {return { id: branch.id, name: branch.address || ''}}) || [] :
                []
              }
              {...field}
          />
        )}
        rules={{
          required: !!watchLaundry,
      }}
      />
    </StepBaseInternal>
    <ButtonLine>
      <LinkButton onClick={toPreviousStep}>Previous step</LinkButton>
      <BasicButton onClick={toNextStep}>Continue</BasicButton>
    </ButtonLine>
  </StepBase>;
}

export { StepLaundryInfo };