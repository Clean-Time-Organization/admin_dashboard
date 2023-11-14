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
  TextField,
  Typography
} from "@mui/material";
import {AxiosResponse} from "axios";
import {Controller, useForm} from "react-hook-form";

enum Status {
  Active = 1,
  Inactive = 2,
}

const StaffEditInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')

  const [email, setEmail] = useState('')

  const [status, setStatus] = useState(Status.Inactive)
  const [statusError, setStatusError] = useState('')

  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const { handleSubmit, control } = useForm()

  const handleClose = () => {
    navigate(`/staff/${id}`)
  }

  const getEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.get(`/user/staff/${id}`)
  }

  const updateEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.put(`/user/staff/${id}`, {
      full_name: userName,
      email: email,
      phone_number: phone,
      is_active: status === Status.Active,
    })
  }

  const getEntityMutation = useMutation(getEntity, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setUserName([response.data.first_name, response.data.last_name].join(' '))
          setEmail(response.data.email)
          setStatus(response.data.is_active ? Status.Active : Status.Inactive)
          setPhone(response.data.phone_number)

          break

        // case 400:
        //   setErrorMessage(response.details)
        //   break
        //
        // case 404:
        //   setEmailError("Couldn't find your account")
        //   break
        //
        // case 422:
        //   setEmailError('Please enter a valid email address')
        //   break

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
          // show ok toast
          break

        // case 400:
        //   setErrorMessage(response.details)
        //   break
        //
        // case 404:
        //   setEmailError("Couldn't find your account")
        //   break
        //
        // case 422:
        //   setEmailError('Please enter a valid email address')
        //   break

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

  useEffect(() => {
    getEntityMutation.mutate()
  }, [])

  useEffect(() => {
    setUserNameError('')
  }, [userName])

  useEffect(() => {
    setPhoneError('')
  }, [phone])

  const onSubmit = () => {
    if (userName.trim() === '') {
      setUserNameError('Please enter user name')
    }
    if (phone.trim() === '') {
      setUserNameError('Please enter phone')
    }

    if (!userNameError && !phoneError) {
      updateEntityMutation.mutate()
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
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
                paddingBottom: "28px",
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
                  onChange={e => setStatus(e.target.value === "1" ? Status.Active : Status.Inactive)}
                  InputLabelProps={{
                    shrink: true,
                    style: {
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
                  paddingBottom: "28px",
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
    </form>
  )
}

export { StaffEditInfo }