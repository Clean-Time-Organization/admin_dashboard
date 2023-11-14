import {useEffect, useState} from 'react';
import httpClient from "../services/HttpClient";
import {useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {AxiosResponse} from "axios";
import {Controller, useForm} from "react-hook-form";

enum Status {
  Active,
  Inactive,
}

const StaffEditInfo = () => {
  const { id } = useParams()

  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')

  const [email, setEmail] = useState('')

  const [status, setStatus] = useState(Status.Inactive)
  const [statusError, setStatusError] = useState('')

  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const { handleSubmit, control } = useForm()

  const getEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.get(`/user/staff/${id}`)
  }

  const updateEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.put(`/user/staff/${id}`, {
      full_name: userName,
      email: email,
      phone_number: phone,
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
      setUserName('')
      // setErrorMessage('Error occurred while communicating server')
      console.warn(error)
    },
  })

  const updateEntityMutation = useMutation(updateEntity, {
    onSuccess: response => {
      setUserName('')

      switch (response.status) {
        case 200:
          console.dir(response)
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
      setUserName('')
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
            marginTop: "32px",
          }}
        >
          <Typography
            sx={{
              color: "#2E8DC8",
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Anek Latin",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "130%",
              padding: "10px 24px 10px 16px",
            }}
          >
            Close
          </Typography>
        </Box>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              padding: "32px",
              borderRadius: "8px",
              background: "#fff",
              // boxShadow: "none",
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
              }}
            >
              Edit Info
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
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
                }}
              >
                Basic Info
              </Typography>
              <Box
                sx={{
                  marginBottom: "32px",
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
                  marginBottom: "32px",
                }}
              >
                <InputLabel id="statusSelectLabel">Status</InputLabel>
                <Select
                  labelId="statusSelectLabel"
                  value={status}
                  label="Status"
                  // onChange={handleChange}
                >
                  <MenuItem value={Status.Active}>Active</MenuItem>
                  <MenuItem value={Status.Inactive}>Inactive</MenuItem>
                </Select>
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
                gap: "3px",
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
                }}
              >
                Contact Info
              </Typography>
              <Box
                sx={{
                  marginBottom: "32px",
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
                  // disabled={checkEmailMutation.isLoading}
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
                  // startIcon={
                  //   checkEmailMutation.isLoading ? (
                  //     <Stack
                  //       alignItems="center"
                  //       style={{
                  //         paddingLeft: "15px"
                  //       }}>
                  //       <CircularProgress
                  //         size={25}
                  //         style={{
                  //           color: "white",
                  //         }} />
                  //     </Stack>
                  //   ) : null
                  // }
                >
                  {/*{checkEmailMutation.isLoading ? '' : 'Continue'}*/}
                  Save
                </Button>
              </Box>
            </Box>
          </Paper>
      </Box>
    </form>
  )
}

export { StaffEditInfo }
