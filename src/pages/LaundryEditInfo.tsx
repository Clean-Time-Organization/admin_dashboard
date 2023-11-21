import {useEffect, useState} from 'react';
import httpClient from "../services/HttpClient";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {
  Alert,
  Box,
  Button,
  CircularProgress, Link, MenuItem, Paper,
  Stack,
  TextField, ThemeProvider,
  Typography
} from "@mui/material";
import {AxiosResponse} from "axios";
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch} from "../store/hooks";
import {setNotification} from "../store/features/notification";
import theme from "../components/LogIn/Styles/Theme";
import {Document} from "../components/Icons/Document";
import {Download} from "../components/Icons/Download";

enum Status {
  Active = 1,
  Inactive = 2,
}

type ApiRequest = {
  name_en: string
  name_ar: string
  full_name: string
  phone_number: string
  address: string
  vat_number: string
  cr_number: string
  is_active: boolean
}

const LaundryEditInfo = () => {
  const { id } = useParams()
  const init = {
    id,
    name_en: '',
    name_ar: '',
    is_active: false,
    address: '',
    document: {
      cr_file: '',
      cr_number: '',
      vat_file: '',
      vat_number: '',
    },
    owner: {
      first_name: '',
      last_name: '',
      phone_number: '',
      id: 0,
      is_active: false,
      role: 'POS',
      email: '',
    }
  }

  const navigate = useNavigate()

  const [data, setData] = useState(init)

  const [nameEn, setNameEn] = useState('')
  const [nameEnError, setNameEnError] = useState('')

  const [nameAr, setNameAr] = useState('')
  const [nameArError, setNameArError] = useState('')

  const [status, setStatus] = useState(Status.Inactive)
  const [statusError, setStatusError] = useState('')

  const [ownerName, setOwnerName] = useState('')
  const [ownerNameError, setOwnerNameError] = useState('')

  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')

  const [vatNumber, setVatNumber] = useState('')
  const [vatNumberError, setVatNumberError] = useState('')

  const [crNumber, setCrNumber] = useState('')
  const [crNumberError, setCrNumberError] = useState('')

  const { handleSubmit, control } = useForm()
  const dispatch = useAppDispatch()

  const handleClose = () => {
    navigate(`/laundries/${id}`)
  }

  const getEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.get(`/laundry/${id}`)
  }

  const updateEntity = async (): Promise<AxiosResponse> => {
    let apiData: ApiRequest = {
      name_en: nameEn,
      name_ar: nameAr,
      full_name: ownerName,
      phone_number: phone,
      address: address,
      vat_number: vatNumber,
      cr_number: crNumber,
      is_active: status === Status.Active,
    }
    return await httpClient.put(`/laundry/${id}`, apiData)
  }

  const getEntityMutation = useMutation(getEntity, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setData(response.data)

          setNameEn(response.data.name_en)
          setNameAr(response.data.name_ar)
          setStatus(response.data.is_active ? Status.Active : Status.Inactive)
          setOwnerName([response.data.owner.first_name, response.data.owner.last_name].join(' '))
          setPhone(response.data.owner.phone_number)
          setAddress(response.data.address)
          setVatNumber(response.data.document.vat_number)
          setCrNumber(response.data.document.cr_number)

          break

        default:
          // setErrorMessage('Unknown server response')
          break
      }
    },
    onError: (error) => {
      // setErrorMessage('Error occurred while communicating server')
      console.warn(error)
    },
  })

  const updateEntityMutation = useMutation(updateEntity, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          navigate(`/staff/${id}`)

          dispatch(setNotification({
            notificationMessage: 'Laundry successfully updated',
            notificationType: 'success',
          }))
          break

        default:
          // setErrorMessage('Unknown server response')
          break
      }
    },
    onError: (error: any) => {
      let userNameErrors: string[] = []
      let phoneErrorrs: string[] = []

      if (Array.isArray(error.response.data.detail)) {
        error.response.data.detail.map((errDetail: { loc: string | string[]; msg: string; }) => {
          if (errDetail.loc.includes('full_name')) {
            userNameErrors.push(errDetail.msg)
          } else if (errDetail.loc.includes('phone_number')) {
            phoneErrorrs.push(errDetail.msg)
          }
        })
      } else {
        userNameErrors = [error.response.data.detail]
      }

      if (userNameErrors.length) {
        setOwnerNameError(userNameErrors.join(', '))
      } else if (phoneErrorrs.length) {
        setPhoneError(phoneErrorrs.join(', '))
      } else {
        dispatch(setNotification({
          notificationMessage: error.response.data.detail + '',
          notificationType: 'error',
        }))
      }
    },
  })

  useEffect(() => {
    getEntityMutation.mutate()
  }, [])

  useEffect(() => {
    setNameEnError('')
  }, [nameEn])

  useEffect(() => {
    setNameArError('')
  }, [nameAr])

  useEffect(() => {
    setPhoneError('')
  }, [phone])

  useEffect(() => {
    setAddressError('')
  }, [address])

  const onSubmit = () => {
    let errors = false

    if (nameEn.trim() === '') {
      setNameEnError('Please enter name')
      errors = true
    }
    if (nameAr.trim() === '') {
      setNameArError('Please enter name')
      errors = true
    }
    if (phone.trim() === '') {
      setPhoneError('Please enter phone')
      errors = true
    }

    if (!errors) {
      updateEntityMutation.mutate()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "672px",
            }}
          >
            <Box
              sx={{
                width: "672px",
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: "32px",
              }}
            >
              <Button
                startIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_653_1102" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                      <rect width="20" height="20" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_653_1102)">
                      <path d="M9.99999 10.8782L5.77241 15.1057C5.65703 15.2211 5.512 15.2802 5.33732 15.2828C5.16266 15.2855 5.01496 15.2265 4.89424 15.1057C4.7735 14.985 4.71313 14.8387 4.71313 14.6667C4.71313 14.4947 4.7735 14.3483 4.89424 14.2276L9.1218 9.99999L4.89424 5.77241C4.77885 5.65703 4.71982 5.512 4.71716 5.33732C4.71447 5.16266 4.7735 5.01496 4.89424 4.89424C5.01496 4.7735 5.16132 4.71313 5.33332 4.71313C5.50532 4.71313 5.65168 4.7735 5.77241 4.89424L9.99999 9.1218L14.2276 4.89424C14.3429 4.77885 14.488 4.71982 14.6627 4.71716C14.8373 4.71447 14.985 4.7735 15.1057 4.89424C15.2265 5.01496 15.2868 5.16132 15.2868 5.33332C15.2868 5.50532 15.2265 5.65168 15.1057 5.77241L10.8782 9.99999L15.1057 14.2276C15.2211 14.3429 15.2802 14.488 15.2828 14.6627C15.2855 14.8373 15.2265 14.985 15.1057 15.1057C14.985 15.2265 14.8387 15.2868 14.6667 15.2868C14.4947 15.2868 14.3483 15.2265 14.2276 15.1057L9.99999 10.8782Z" fill="#2E8DC8"/>
                    </g>
                  </svg>
                }
                style={{
                  borderRadius: "4px",
                  maxWidth: "105px",
                  maxHeight: "40px",
                  minWidth: "105px",
                  minHeight: "40px",
                  color: "#2E8DC8",
                  textAlign: "center",
                  textTransform: "none",
                  fontFamily: "Anek Latin",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "130%",
                  letterSpacing: "0.32px",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "32px",
                borderRadius: "8px",
                background: "#fff",
                boxShadow: "none",
              }}
            >
              <Typography
                sx={{
                  color: "#0E1019",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontFamily: "Anek Latin",
                  fontSize: "28px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "120%",
                  paddingBottom: "24px",
                }}
              >
                Edit Info
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "#0E1019",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontFamily: "Anek Latin",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "120%",
                    paddingBottom: "32px",
                  }}
                >
                  Basic Info
                </Typography>
                <Box
                  sx={{
                    paddingBottom: "24px",
                  }}
                >
                  <Controller
                    control={control}
                    name="nameEn"
                    defaultValue={nameEn}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                      <TextField
                        id={field.name}
                        label="Laundry Name (EN)"
                        value={nameEn || ''}
                        autoFocus
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#6B7280",
                            fontFamily: "Anek Latin",
                            fontStyle: "normal",
                            fontWeight: "400",
                            transform: "translate(15px, -9px) scale(0.75)",
                          }
                        }}
                        fullWidth
                        error={!!nameEnError}
                        onChange={e => setNameEn(e.target.value)}
                        variant="outlined"
                        inputProps={{
                          style: {
                            WebkitBoxShadow: "0 0 0 1000px white inset"
                          }
                        }}
                        sx={{
                          "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            width: "357px"
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#2E8DC8",
                            },
                          },
                        }}
                      />
                    )}
                  />
                  {nameEnError ?
                    <Alert
                      variant="support"
                      severity="error"
                    >
                      {nameEnError}
                    </Alert>
                    : null}
                </Box>
                <Box
                  sx={{
                    paddingBottom: "24px",
                  }}
                >
                  <Controller
                    control={control}
                    name="nameAr"
                    defaultValue={nameAr}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                      <TextField
                        id={field.name}
                        label="Laundry Name (AR)"
                        value={nameAr || ''}
                        autoFocus
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#6B7280",
                            fontFamily: "Anek Latin",
                            fontStyle: "normal",
                            fontWeight: "400",
                            transform: "translate(15px, -9px) scale(0.75)",
                          }
                        }}
                        fullWidth
                        error={!!nameArError}
                        onChange={e => setNameAr(e.target.value)}
                        variant="outlined"
                        inputProps={{
                          style: {
                            WebkitBoxShadow: "0 0 0 1000px white inset"
                          }
                        }}
                        sx={{
                          "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            width: "357px"
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#2E8DC8",
                            },
                          },
                        }}
                      />
                    )}
                  />
                  {nameArError ?
                    <Alert
                      variant="support"
                      severity="error"
                    >
                      {nameArError}
                    </Alert>
                    : null}
                </Box>
                <Box
                  sx={{
                    paddingBottom: "28px",
                  }}
                >
                  <TextField
                    id="outlined-select-status"
                    select
                    label="Status"
                    value={status}
                    fullWidth
                    onChange={e => setStatus(+e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                      style: {
                        color: "#6B7280",
                        fontFamily: "Anek Latin",
                        fontStyle: "normal",
                        fontWeight: "400",
                        transform: "translate(15px, -9px) scale(0.75)",
                      }
                    }}
                    variant="outlined"
                    inputProps={{
                      style: {
                        WebkitBoxShadow: "0 0 0 1000px white inset"
                      }
                    }}
                    sx={{
                      "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                        width: "357px"
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#D1D5DB",
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: "#2E8DC8",
                        },
                      },
                    }}
                  >
                    <MenuItem value={Status.Active}>Active</MenuItem>
                    <MenuItem value={Status.Inactive}>Inactive</MenuItem>
                  </TextField>
                  {statusError ?
                    <Alert
                      variant="support"
                      severity="error"
                    >
                      {statusError}
                    </Alert>
                    : null}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "#0E1019",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontFamily: "Anek Latin",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "120%",
                    paddingBottom: "32px",
                  }}
                >
                  Contact Info
                </Typography>
                <Box
                  sx={{
                    paddingBottom: "24px",
                  }}
                >
                  <Controller
                    control={control}
                    name="ownerName"
                    defaultValue={ownerName}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                      <TextField
                        id={field.name}
                        label="Laundry owner"
                        value={ownerName || ''}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#6B7280",
                            fontFamily: "Anek Latin",
                            fontStyle: "normal",
                            fontWeight: "400",
                            transform: "translate(15px, -9px) scale(0.75)",
                          }
                        }}
                        fullWidth
                        error={!!ownerNameError}
                        onChange={e => setOwnerName(e.target.value)}
                        variant="outlined"
                        inputProps={{
                          style: {
                            WebkitBoxShadow: "0 0 0 1000px white inset"
                          }
                        }}
                        sx={{
                          "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            width: "357px"
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#2E8DC8",
                            },
                          },
                        }}
                      />
                    )}
                  />
                  {ownerNameError ?
                    <Alert
                      variant="support"
                      severity="error"
                    >
                      {ownerNameError}
                    </Alert>
                    : null}
                </Box>
                <Box
                  sx={{
                    paddingBottom: "24px",
                  }}
                >
                  <Controller
                    control={control}
                    name="phone"
                    defaultValue={phone}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                      <TextField
                        id={field.name}
                        label="Phone Number"
                        value={phone || ''}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#6B7280",
                            fontFamily: "Anek Latin",
                            fontStyle: "normal",
                            fontWeight: "400",
                            transform: "translate(15px, -9px) scale(0.75)",
                          }
                        }}
                        fullWidth
                        error={!!phoneError}
                        onChange={e => setPhone(e.target.value)}
                        variant="outlined"
                        inputProps={{
                          style: {
                            WebkitBoxShadow: "0 0 0 1000px white inset"
                          }
                        }}
                        sx={{
                          "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            width: "357px"
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#2E8DC8",
                            },
                          },
                        }}
                      />
                    )}
                  />
                  {phoneError ?
                    <Alert
                      variant="support"
                      severity="error"
                    >
                      {phoneError}
                    </Alert>
                    : null}
                </Box>
                <Box
                  sx={{
                    paddingBottom: "28px",
                  }}
                >
                  <Controller
                    control={control}
                    name="address"
                    defaultValue={address}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                      <TextField
                        id={field.name}
                        label="Address"
                        value={address || ''}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            color: "#6B7280",
                            fontFamily: "Anek Latin",
                            fontStyle: "normal",
                            fontWeight: "400",
                            transform: "translate(15px, -9px) scale(0.75)",
                          }
                        }}
                        fullWidth
                        error={!!addressError}
                        onChange={e => setAddress(e.target.value)}
                        variant="outlined"
                        inputProps={{
                          readOnly: true,
                          style: {
                            WebkitBoxShadow: "0 0 0 1000px white inset"
                          }
                        }}
                        sx={{
                          "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            width: "357px"
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#D1D5DB",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#2E8DC8",
                            },
                          },
                        }}
                      />
                    )}
                  />
                  {addressError &&
                    <Alert
                        variant="support"
                        severity="error"
                    >
                      {addressError}
                    </Alert>}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "#0E1019",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontFamily: "Anek Latin",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "120%",
                    paddingBottom: "32px",
                  }}
                >
                  Vat Number
                </Typography>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  sx={{
                    flexDirection: "row",
                    paddingBottom: "24px",
                  }}
                >
                  <Box>
                    <Controller
                      control={control}
                      name="vatNumber"
                      defaultValue={vatNumber}
                      render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <TextField
                          id={field.name}
                          label="VAT Number"
                          value={vatNumber || ''}
                          InputLabelProps={{
                            shrink: true,
                            style: {
                              color: "#6B7280",
                              fontFamily: "Anek Latin",
                              fontStyle: "normal",
                              fontWeight: "400",
                              transform: "translate(15px, -9px) scale(0.75)",
                            }
                          }}
                          error={!!vatNumberError}
                          onChange={e => setVatNumber(e.target.value)}
                          variant="outlined"
                          inputProps={{
                            style: {
                              WebkitBoxShadow: "0 0 0 1000px white inset"
                            }
                          }}
                          sx={{
                            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                              width: "368px"
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#D1D5DB",
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: "#2E8DC8",
                              },
                            },
                          }}
                        />
                      )}
                    />
                    {vatNumberError ?
                      <Alert
                        variant="support"
                        severity="error"
                      >
                        {vatNumberError}
                      </Alert>
                      : null}
                  </Box>
                  {data.document.vat_number &&
                    <Box
                      sx={{
                        paddingLeft: "32px",
                        paddingTop: "17px",
                      }}
                    >
                      <Document />
                    </Box>
                  }
                  {data.document.vat_number &&
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
                        {data.document.vat_number}
                      </Typography>
                    </Box>
                  }
                  {data.document.vat_file &&
                    <Box
                      sx={{
                        paddingLeft: "36px",
                        paddingTop: "15px",
                      }}
                    >
                      <Link href={data.document.vat_file}>
                        <Download />
                      </Link>
                    </Box>
                  }
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "#0E1019",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontFamily: "Anek Latin",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "120%",
                    paddingBottom: "32px",
                  }}
                >
                  CR Number
                </Typography>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  sx={{
                    flexDirection: "row",
                    paddingBottom: "24px",
                  }}
                >
                  <Box>
                    <Controller
                      control={control}
                      name="crNumber"
                      defaultValue={crNumber}
                      render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <TextField
                          id={field.name}
                          label="CR Number"
                          value={crNumber || ''}
                          InputLabelProps={{
                            shrink: true,
                            style: {
                              color: "#6B7280",
                              fontFamily: "Anek Latin",
                              fontStyle: "normal",
                              fontWeight: "400",
                              transform: "translate(15px, -9px) scale(0.75)",
                            }
                          }}
                          error={!!crNumberError}
                          onChange={e => setCrNumber(e.target.value)}
                          variant="outlined"
                          inputProps={{
                            style: {
                              WebkitBoxShadow: "0 0 0 1000px white inset"
                            }
                          }}
                          sx={{
                            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                              width: "368px"
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#D1D5DB",
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: "#2E8DC8",
                              },
                            },
                          }}
                        />
                      )}
                    />
                    {crNumberError ?
                      <Alert
                        variant="support"
                        severity="error"
                      >
                        {crNumberError}
                      </Alert>
                      : null}
                  </Box>
                  {data.document.cr_number &&
                      <Box
                        sx={{
                          paddingLeft: "32px",
                          paddingTop: "17px",
                        }}
                      >
                        <Document />
                      </Box>
                  }
                  {data.document.cr_number &&
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
                        {data.document.cr_number}
                      </Typography>
                    </Box>
                  }
                  {data.document.cr_file &&
                    <Box
                      sx={{
                        paddingLeft: "36px",
                        paddingTop: "15px",
                      }}
                    >
                      <Link href={data.document.cr_file}>
                        <Download />
                      </Link>
                    </Box>
                  }
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation={true}
                    disabled={updateEntityMutation.isLoading}
                    style={{
                      backgroundColor: "#2E8DC8",
                      borderRadius: "4px",
                      padding: "0px",
                      margin: "0px",
                      maxWidth: "135px",
                      maxHeight: "40px",
                      minWidth: "135px",
                      minHeight: "40px",
                      fontFamily: "Anek Latin",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "24px",
                      textTransform: "capitalize",
                    }}
                    startIcon={
                      updateEntityMutation.isLoading ? (
                        <Stack
                          alignItems="center"
                          style={{
                            paddingLeft: "15px"
                          }}>
                          <CircularProgress
                            size={25}
                            style={{
                              color: "white",
                            }} />
                        </Stack>
                      ) : null
                    }
                  >
                    {updateEntityMutation.isLoading ? '' : 'Save'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </form>
    </ThemeProvider>
  )
}

export { LaundryEditInfo }
