import {FC, useRef, useState} from "react";
import {BasicButtonLong, LinkButton, LinkButtonLong} from "../../components/Button/Buttons";
import {Control, Controller, UseFormTrigger, UseFormWatch} from "react-hook-form";
import {BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle, Titles } from "./styled";
import {LaundryForm} from "./CreateLaundry";
import {InputBase} from "../../components/InputBase/InputBase";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {Box, Typography} from "@mui/material";
import {Document} from "../../components/Icons/Document";
import {Attach} from "../../components/Icons/Attach";

interface IStepLaundryInfoProps {
  readonly control: Control<LaundryForm>
  readonly errors: FieldErrors<any>
  readonly trigger: UseFormTrigger<LaundryForm>
  toPreviousStep: () => void
  onCreate: () => void
}

const StepTaxInfo: FC<IStepLaundryInfoProps> = ({control, errors, trigger, toPreviousStep, onCreate}) => {
  const vatFileRef = useRef<HTMLInputElement>(null)
  const crFileRef = useRef<HTMLInputElement>(null)

  const[vatFile, setVatFile] = useState('')
  const[crFile, setCrFile] = useState('')

  const handleCreate = () => {
    trigger()
    const stepFields = ['vat_number', 'cr_number']
    const errorFields = Object.keys(errors)
    let stepIsValid = !stepFields.some(item => errorFields.includes(item))

    if (stepIsValid) {
      onCreate()
    }
  }

  const showUploadVatFile = () => {
    if (vatFileRef.current) {
      vatFileRef.current.click()
    }
  }

  const showUploadCrFile = () => {
    if (crFileRef.current) {
      crFileRef.current.click()
    }
  }

  return <StepBase>
    <StepBaseInternal>
      <StepTitle>Tax Info</StepTitle>
      <StepSubtitle>Provide financial information and attach files</StepSubtitle>
    </StepBaseInternal>
    <StepBaseInternal>
      <Titles>
        <BlockTitle>Vat Number</BlockTitle>
        <BlockSubtitle>Please indicate the VAT number for the laundry. Upload a file up to 10 MB.</BlockSubtitle>
      </Titles>
      <Box
        display="flex"
        justifyContent="flex-start"
        sx={{
          flexDirection: "row",
        }}
      >
        <Box
          maxWidth={466}
          minWidth={466}
        >
          <Controller
            control={control}
            name="vat_number"
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <InputBase
                autoFocus
                label={'VAT Number'}
                error={error !== undefined}
                errorText={error?.type === 'required' && 'Please enter the VAT Number' ||
                  error && error?.message
                }
                autoComplete={'off'}
                {...field}
                sx={{
                  // maxWidth: "466px"
                }}
              />
            )}
            rules={{
              required: true,
            }}
          />
        </Box>
        {vatFile ?
            <Box>
                <Box
                    sx={{
                      paddingLeft: "32px",
                      paddingTop: "17px",
                    }}
                >
                    <Document />
                </Box>
                <Box
                    sx={{
                      display: "flex",
                      alignItems: "left",
                      paddingLeft: "8px",
                      paddingTop: "18px",
                      maxWidth: "86px",
                      minWidth: "86px",
                    }}
                >
                    <Typography
                        sx={{
                          color: "#656873",
                          textAlign: "center",
                          leadingTrim: "both",
                          textEdge: "cap",
                          fontFamily: "Anek Latin",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "130%",
                          letterSpacing: "0.28px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                    >
                      {vatFile}
                    </Typography>
                </Box>
            </Box>
          :
            <Box
              sx={{
                paddingLeft: "10px",
                paddingTop: "8px",
              }}
            >
              <LinkButton
                onClick={showUploadVatFile}
                preTextIcon={<Attach />}
                pretext="true"
              >
                Upload file
              </LinkButton>
            </Box>
        }
        <input ref={vatFileRef} type="file" accept=".jpg,.jpeg,.png" style={{ display: "none" }}/>
      </Box>
      <Titles>
        <BlockTitle>CR Number</BlockTitle>
        <BlockSubtitle>Please indicate the CR number for the laundry. Upload a file up to 10 MB.</BlockSubtitle>
      </Titles>
      <Box
        display="flex"
        justifyContent="flex-start"
        sx={{
          flexDirection: "row",
        }}
      >
        <Box
          maxWidth={466}
          minWidth={466}
        >
          <Controller
            control={control}
            name="cr_number"
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <InputBase
                label={'CR Number'}
                error={error !== undefined}
                errorText={error?.type === 'required' && 'Please enter the CR Number' ||
                  error && error?.message
                }
                autoComplete={'off'}
                {...field}
              />
            )}
            rules={{
              required: true,
            }}
          />
        </Box>
        {crFile ?
          <Box>
            <Box
              sx={{
                paddingLeft: "32px",
                paddingTop: "17px",
              }}
            >
              <Document />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                paddingLeft: "8px",
                paddingTop: "18px",
                maxWidth: "86px",
                minWidth: "86px",
              }}
            >
              <Typography
                sx={{
                  color: "#656873",
                  textAlign: "center",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontFamily: "Anek Latin",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "130%",
                  letterSpacing: "0.28px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {vatFile}
              </Typography>
            </Box>
          </Box>
          :
          <Box
            sx={{
              paddingLeft: "10px",
              paddingTop: "8px",
            }}
          >
            <LinkButton
              onClick={showUploadCrFile}
              preTextIcon={<Attach />}
              pretext="true"
            >
              Upload file
            </LinkButton>
          </Box>
        }
        <input ref={crFileRef} type="file" accept=".jpg,.jpeg,.png" style={{ display: "none" }}/>
      </Box>
    </StepBaseInternal>
    <ButtonLine>
      <LinkButtonLong onClick={toPreviousStep}>Previous step</LinkButtonLong>
      <BasicButtonLong onClick={handleCreate}>Create laundry</BasicButtonLong>
    </ButtonLine>
  </StepBase>;
}

export { StepTaxInfo }
