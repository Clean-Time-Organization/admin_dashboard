import {ChangeEvent, createRef, FC, useEffect, useRef, useState} from "react";
import {BasicButtonLong, LinkButton, LinkButtonLong} from "../../components/Button/Buttons";
import {Control, Controller, UseFormTrigger} from "react-hook-form";
import {BlockSubtitle, BlockTitle, ButtonLine, StepBase, StepBaseInternal, StepSubtitle, StepTitle, Titles } from "./styled";
import {LaundryForm} from "./CreateLaundry";
import {InputBase} from "../../components/InputBase/InputBase";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {
  Box, Button, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography
} from "@mui/material";
import {Document} from "../../components/Icons/Document";
import {Attach} from "../../components/Icons/Attach";
import {Delete} from "../../components/Icons/Delete";
import {Close} from "../../components/Icons/Close";
import {useAppDispatch} from "../../store/hooks";
import {setNotification} from "../../store/features/notification";
import {
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form/dist/types/form";

interface IStepLaundryInfoProps {
  readonly control: Control<LaundryForm>
  readonly watch: UseFormWatch<LaundryForm>
  readonly errors: FieldErrors<any>
  readonly trigger: UseFormTrigger<LaundryForm>
  readonly setValue: UseFormSetValue<LaundryForm>
  readonly resetField: UseFormResetField<LaundryForm>
  toPreviousStep: () => void
  onCreate: () => void
}

const StepTaxInfo: FC<IStepLaundryInfoProps> = (
  {
    control,
    watch,
    errors,
    trigger,
    setValue,
    resetField,
    toPreviousStep,
    onCreate,
  }) => {
  const dispatch = useAppDispatch()

  const watchVatFile = watch('vat_file')
  const watchCrFile = watch('cr_file')

  const vatFileRef = useRef<HTMLInputElement>(null)
  const crFileRef = useRef<HTMLInputElement>(null)

  const [openDialog, setOpenDialog] = useState(false)
  const [fileToDelete, setFileToDelete] = useState('')

  const handleCreate = async () => {
    await trigger('vat_number')
    await trigger('cr_number')

    const stepFields = ['vat_number', 'cr_number']
    const errorFields = Object.keys(errors)
    let stepIsValid = !stepFields.some(item => errorFields.includes(item))

    if (!watchVatFile || !watchCrFile) {
      stepIsValid = false

      dispatch(setNotification({
        notificationMessage: 'File is required',
        notificationType: 'error',
      }))
    }

    if (stepIsValid) {
      onCreate()
    }
  }

  const showUploadVatFile = () => {
    vatFileRef.current!.click()
  }

  const showUploadCrFile = () => {
    crFileRef.current!.click()
  }

  const handleVatFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetField('vat_file')

    if (event.target.files!.length) {
      setValue('vat_file', event.target.files![0])
    }
  }

  const handleCrFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetField('cr_file')

    if (event.target.files!.length) {
      setValue('cr_file', event.target.files![0])
    }
  }

  const removeVatFileDialog = () => {
    setFileToDelete('vat')
    setOpenDialog(true)
  }

  const removeCrFileDialog = () => {
    setFileToDelete('cr')
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleDialogConfirm = () => {
    if (fileToDelete === 'vat') {
      resetField('vat_file')
    } else if (fileToDelete === 'cr') {
      resetField('cr_file')
    }

    setFileToDelete('')
    setOpenDialog(false)
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
          maxWidth={396}
          minWidth={396}
        >
          <Controller
            control={control}
            name="vat_number"
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <InputBase
                autoFocus
                // type="number"
                label={'VAT Number'}
                error={error !== undefined}
                errorText={error?.type === 'required' && 'Please enter the VAT Number' ||
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
        {watchVatFile ?
            <>
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
                  {watchVatFile.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  paddingTop: "6px",
                  paddingLeft: "30px",
                }}
              >
                <IconButton
                  onClick={removeVatFileDialog}
                >
                  <Delete />
                </IconButton>
              </Box>
            </>
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
                <input
                  id={'vatFile'}
                  ref={vatFileRef}
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png"
                  onChange={handleVatFileChange}
                  name="vatFileRef"
                />
              </LinkButton>
            </Box>
        }
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
          maxWidth={396}
          minWidth={396}
        >
          <Controller
            control={control}
            name="cr_number"
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <InputBase
                // type="number"
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
        {watchCrFile ?
          <>
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
                {watchCrFile.name}
              </Typography>
            </Box>
            <Box
              sx={{
                paddingTop: "6px",
                paddingLeft: "30px",
              }}
            >
              <IconButton
                onClick={removeCrFileDialog}
              >
                <Delete />
              </IconButton>
            </Box>
          </>
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
              <input
                id={'crFile'}
                ref={crFileRef}
                type="file"
                hidden
                accept=".jpg,.jpeg,.png"
                onChange={handleCrFileChange}
                name="[crFileRef]"
              />
            </LinkButton>
          </Box>
        }
      </Box>
    </StepBaseInternal>
    <ButtonLine>
      <LinkButtonLong onClick={toPreviousStep}>Previous step</LinkButtonLong>
      <BasicButtonLong onClick={handleCreate}>Create laundry</BasicButtonLong>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          borderRadius: "8px",
          background: "#FFF",
          minWidth: "570px",
          // maxWidth: "570px",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            paddingBottom: "0px",
          }}
        >
          <Typography
            sx={{
              color: "#0E1019",
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Anek Latin",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "120%",
            }}
          >
            Delete file
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <Close width={24} height={24}/>
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            paddingBottom: "0px",
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              paddingTop: "32px",
              paddingBottom: "32px",
            }}
          >
            <Typography
              sx={{
                color: "#0E1019",
                leadingTrim: "both",
                textEdge: "cap",
                fontFamily: "Anek Latin",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
              }}
            >
              Are you sure that you want to delete this file?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            paddingTop: "16px",
            paddingBottom: "16px",
            paddingRight: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "24px",
            }}
          >
            <Button
              autoFocus
              variant="contained"
              disableElevation={true}
              onClick={handleCloseDialog}
              style={{
                backgroundColor: "#FFF",
                borderRadius: "4px",
                margin: "0px",
                maxWidth: "125px",
                maxHeight: "40px",
                minWidth: "125px",
                minHeight: "40px",
                textTransform: "capitalize",
                color: "#2E8DC8",
                textAlign: "center",
                fontFamily: "Anek Latin",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "130%",
                letterSpacing: "0.32px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation={true}
              onClick={handleDialogConfirm}
              style={{
                backgroundColor: "#2E8DC8",
                borderRadius: "4px",
                padding: "0px",
                margin: "0px",
                maxWidth: "156px",
                maxHeight: "40px",
                minWidth: "156px",
                minHeight: "40px",
                textTransform: "capitalize",
                color: "#FFF",
                textAlign: "center",
                fontFamily: "Anek Latin",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "130%",
                letterSpacing: "0.32px",
              }}
            >
              Delete
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </ButtonLine>
  </StepBase>
}

export { StepTaxInfo }
