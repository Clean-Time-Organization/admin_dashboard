import {useEffect, useState} from 'react';
import httpClient from "../services/HttpClient";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {
  Alert,
  Box,
  Button,
  CircularProgress, MenuItem, Paper,
  Stack,
  TextField, ThemeProvider,
  Typography
} from "@mui/material";
import {AxiosResponse} from "axios";
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch} from "../store/hooks";
import {setNotification} from "../store/features/notification";
import {Branch, Laundry, User} from "../types/user";
import {Autocomplete} from "../components/Autocomplete/Autocomplete";
import theme from "../components/LogIn/Styles/Theme";

enum Status {
  Active = 1,
  Inactive = 2,
}

type ApiRequest = {
  full_name: string
  phone_number: string
  email: string
  laundry_id?: number
  branch_id?: number
  is_active: boolean
}

const StaffEditInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const init: User = {
    first_name: '',
    last_name: '',
    phone_number: '',
    id: 0,
    is_active: false,
    role: 'POS',
    email: '',
  }

  const [data, setData] = useState(init)

  const [selectedLaundry, setSelectedLaundry] = useState<{ id: number; name: string } | null>(null)
  const [inputLaundry, setInputLaundry] = useState('')
  const [selectedBranch, setSelectedBranch] = useState<{ id: number; name: string } | null>(null)
  const [inputBranch, setInputBranch] = useState('')
  const [laundries, setLaundries] = useState<Array<Laundry>>()
  const [branches, setBranches] = useState<Array<Branch>>()

  const [laundryError, setLaundryError] = useState('')
  const [branchError, setBranchError] = useState('')

  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')

  const [status, setStatus] = useState(Status.Inactive)
  const [statusError, setStatusError] = useState('')

  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [openLaundries, setOpenLaundries] = useState(false);
  const [openBranches, setOpenBranches] = useState(false);

  const { handleSubmit, control } = useForm()
  const dispatch = useAppDispatch()

  const handleClose = () => {
    navigate(`/staff/${id}`)
  }

  useEffect(() => {
    if (data && data.role === "POS") {
      getLaundryData()
    }
  }, [inputLaundry])

  const getLaundryData = async () => {
    const searchParams = new URLSearchParams()
    if (inputLaundry) {
      searchParams.append('name', inputLaundry)
    }
    await httpClient.get('/laundry/search?' + new URLSearchParams(searchParams)).then(response => {
      setLaundries(response.data?.items)
    })
  }

  const setLaundryName = (value: string) => {
    if (value === '') {
      if (inputLaundry) {
        setInputLaundry(value)
        setSelectedBranch(null)
      }
    } else {
      setInputLaundry(value)
    }
  }

  useEffect(() => {
    if (data && data.role === "POS") {
      getBranchesData()
    }
  }, [inputBranch, inputLaundry])

  const getBranchesData = async () => {
    if (selectedLaundry && selectedLaundry.id) {
      const searchParams = new URLSearchParams()
      if (inputBranch) {
        searchParams.append('name', inputBranch.substring(0, 39))
      }
      searchParams.append('laundry_id', selectedLaundry.id + '')
      await httpClient.get('/laundry/branch/search?' + new URLSearchParams(searchParams)).then(response => {
        setBranches(response.data?.items)
      })
    } else {
      setBranches(undefined)
    }
  }

  const getEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.get(`/user/staff/${id}`)
  }

  const updateEntity = async (): Promise<AxiosResponse> => {
    let apiData: ApiRequest = {
      full_name: userName,
      email: email,
      phone_number: phone,
      is_active: status === Status.Active,
    }
    if (data.role === "POS") {
      if (selectedLaundry) {
        apiData.laundry_id = selectedLaundry.id
      }
      if (selectedBranch) {
        apiData.branch_id = selectedBranch.id
      }
    }
    return await httpClient.put(`/user/staff/${id}`, apiData)
  }

  const getEntityMutation = useMutation(getEntity, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setData(response.data)

          setUserName([response.data.first_name, response.data.last_name].join(' '))
          setEmail(response.data.email)
          setStatus(response.data.is_active ? Status.Active : Status.Inactive)
          setPhone(response.data.phone_number)

          if (response.data.role === "POS") {
            setSelectedLaundry({
              id: response.data.staff.laundry.id,
              name: response.data.staff.laundry.name_en,
            })

            setSelectedBranch({
              id: response.data.staff.branch.id,
              name: response.data.staff.branch.address,
            })
          }

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
            notificationMessage: 'User successfully updated',
            notificationType: 'success',
          }))
          break

        default:
          // setErrorMessage('Unknown server response')
          break
      }
    },
    onError: (error: any) => {
      if (Object.keys(error.response.data.detail)[0] === 'email') {
        dispatch(setNotification({
          notificationMessage: 'Incorrect user email',
          notificationType: 'error',
        }))
      } else if (Object.keys(error.response.data.detail)[0] === 'full_name') {
        setUserNameError(Object.values(error.response.data.detail)[0] + '')
      } else if (Object.keys(error.response.data.detail)[0] === 'phone_number') {
        setPhoneError(Object.values(error.response.data.detail)[0] + '');
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
    setUserNameError('')
  }, [userName])

  useEffect(() => {
    setPhoneError('')
  }, [phone])

  useEffect(() => {
    setEmailError('')
  }, [email])

  useEffect(() => {
    setLaundryError('')
  }, [selectedLaundry])

  useEffect(() => {
    setBranchError('')
  }, [selectedBranch])

  const onSubmit = () => {
    let errors = false

    if (userName.trim() === '') {
      setUserNameError('Please enter user name')
      errors = true
    }
    if (phone.trim() === '') {
      setPhoneError('Please enter phone')
      errors = true
    }
    if (data.role === "POS") {
      if (email.trim() === '') {
        setEmailError('Please enter email')
        errors = true
      }
      if (!selectedLaundry || !selectedLaundry.id) {
        setLaundryError('Please select laundry')
        errors = true
      }
      if (!selectedBranch || !selectedBranch.id) {
        setBranchError('Please select branch')
        errors = true
      }
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
                    name="userName"
                    defaultValue={userName}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                      <TextField
                        id={field.name}
                        label="User name"
                        value={userName || ''}
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
                        error={!!userNameError}
                        onChange={e => setUserName(e.target.value)}
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
                  {userNameError ?
                    <Alert
                      variant="support"
                      severity="error"
                    >
                      {userNameError}
                    </Alert>
                    : null}
                </Box>
                <Box
                  sx={{
                    paddingBottom: "28px",
                  }}
                >
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
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
                    name="phone"
                    defaultValue={phone}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                      <TextField
                        id={field.name}
                        label="Phone"
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
                {data.role === "POS" &&
                  <Box
                    sx={{
                      paddingBottom: "28px",
                    }}
                  >
                    <Controller
                      control={control}
                      name="email"
                      defaultValue={email}
                      render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <TextField
                          id={field.name}
                          label="Email"
                          value={email || ''}
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
                          error={!!emailError}
                          onChange={e => setEmail(e.target.value)}
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
                    {emailError &&
                      <Alert
                          variant="support"
                          severity="error"
                      >
                        {emailError}
                      </Alert>}
                  </Box>}
              </Box>
              {data.role === "POS" &&
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
                    Laundry Info
                  </Typography>
                  <Box
                    sx={{
                      paddingBottom: "24px",
                    }}
                  >
                    <Controller
                      control={control}
                      name="laundry_id"
                      render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <Autocomplete
                          id={field.name}
                          label="Laundry"
                          error={!!laundryError}
                          errorText={laundryError}
                          selectedValue={selectedLaundry}
                          selectValue={setSelectedLaundry}
                          inputValue={inputLaundry}
                          setInputValue={setLaundryName}
                          open={openLaundries}
                          setOpen={setOpenLaundries}
                          options={laundries?.map((laundry: Laundry) => {return { id: laundry.id, name: laundry.name_en || '' }}) || []}
                          {...field}
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
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "24px",
                    }}
                  >
                    <Controller
                      control={control}
                      name="branch_id"
                      render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <Autocomplete
                          label="Branch"
                          error={!!branchError}
                          errorText={branchError}
                          selectedValue={selectedBranch}
                          selectValue={setSelectedBranch}
                          inputValue={inputBranch}
                          setInputValue={setInputBranch}
                          disabled={!selectedLaundry || !selectedLaundry.id}
                          open={openBranches}
                          setOpen={setOpenBranches}
                          options={selectedLaundry && selectedLaundry.id ?
                            branches?.map((branch: Branch) => {return { id: branch.id, name: branch.address || ''}}) || [] :
                            []
                          }
                          {...field}
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
                  </Box>
                </Box>
              }
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

export { StaffEditInfo }
