import {memo, useState} from 'react';
import type { FC } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress, Divider, IconButton,
  InputAdornment, Link,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LoginApiReponse, Steps} from "../LogIn";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface Props {
  setStep: (value: Steps) => void
  email: string
  setParentTmpToken: (value: string) => void
  setErrorMessage: (value: string) => void
}

export const PasswordLogin: FC<Props> = memo(function PasswordLogin({setStep, email, setParentTmpToken, setErrorMessage}) {
  const env = import.meta.env

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const login = async (): Promise<LoginApiReponse> => {
    let response: LoginApiReponse = {
      status: 400,
      details: 'Server error'
    }

    setPasswordError('')

    await fetch(`${env.VITE_API_BASE_URL}/auth/access-token`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        email,
        password
      })
    }).then((resp) => {
      response.status = resp.status
      return resp.json()
    }).then(jsonData => {
      if (response.status === 200) {
        response.accessLifetime = jsonData.access_lifetime
        response.accessToken = jsonData.access_token
        response.refreshLifetime = jsonData.refresh_lifetime
        response.refreshToken = jsonData.refresh_token
        response.tokenType = jsonData.token_type
      }
    }).catch(err => {
      response.details = 'Server is unavailable, try again later'
    })

    return response
  }

  const resetPasswordStart = async (): Promise<LoginApiReponse> => {
    let response: LoginApiReponse = {
      status: 400,
      details: 'Server error'
    }

    setPassword('')
    setPasswordError('')
    setParentTmpToken('')

    await fetch(`${env.VITE_API_BASE_URL}/auth/send-email`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        email,
      })
    }).then((resp) => {
      response.status = resp.status
      return resp.json()
    }).then(jsonData => {
      if (response.status === 200) {
        setParentTmpToken(jsonData.tmp_token)
      }
    }).catch(err => {
      response.details = 'Server is unavailable, try again later'
    })

    return response
  }

  const loginMutation = useMutation(login, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          localStorage.setItem('accessLifetime', response.accessLifetime ? response.accessLifetime.toString() : '')
          localStorage.setItem('accessToken', response.accessToken ? response.accessToken : '')
          localStorage.setItem('refreshLifetime', response.refreshLifetime ? response.refreshLifetime.toString() : '')
          localStorage.setItem('refreshToken', response.refreshToken ? response.refreshToken : '')
          localStorage.setItem('tokenType', response.tokenType ? response.tokenType : '')

          navigate('/')
          break

        case 400:
          setPasswordError(response.details)
          break

        case 403:
          setPasswordError('Incorrect password. Please try again')
          //setStep(Steps.TryAgainLater)
          break

        case 404:
          console.warn("User is inactive or has another role or doesn't exist")
          break

        case 422:
          setPasswordError('Please enter a stronger password. It should contain at least 8 characters')
          break

        default:
          setErrorMessage('Unknown server response')
          break
      }
    },
    onError: (error) => {
      setErrorMessage('Error occurred while communicating server')
      console.warn(error)
    },
  })

  const resetPasswordStartMutation = useMutation(resetPasswordStart, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setStep(Steps.PasswordResetStart)
          break

        case 400:
          setErrorMessage(response.details)
          break

        case 404:
          setErrorMessage("Couldn't find your account")
          break

        case 422:
          setErrorMessage('Please provide a valid email address')
          break

        default:
          setErrorMessage('Unknown server response')
          break
      }
    },
    onError: (error) => {
      setErrorMessage('Error occurred while communicating server')
      console.warn(error)
    },
  })

  const onSubmit = () => {
    if (password.trim() === '') {
      setPasswordError('Please enter a password')
    } else {
      loginMutation.mutate()
    }
  }

  const onResetPassword = () => {
    resetPasswordStartMutation.mutate()
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Paper
        variant="box"
        sx={{
          paddingBottom: "56px",
        }}
      >
        <Box
          sx={{
            marginBottom: "16px",
          }}
        >
          <Typography
            gutterBottom
            variant="h1"
            component="div"
          >
            Enter your password
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "48px",
          }}
        >
          <Chip
            label={email}
            variant="outlined"
            sx={{
              height: "32px",
              maxWidth: "385px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: "#95979F",
              color: "#474A58",
              textAlign: "center",
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Anek Latin",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "140.5%",
            }}
          />
        </Box>
        <Box
          sx={{
            marginBottom: "32px",
          }}
        >
          <Controller
            control={control}
            name="password"
            defaultValue={password}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <TextField
                id={field.name}
                label="Password"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontFamily: "Anek Latin",
                    fontStyle: "normal",
                    fontWeight: "400",
                    width: "385px",
                  }
                }}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                error={!!passwordError}
                defaultValue={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={e => setPasswordError('')}
                variant="outlined"
                InputProps={{
                  endAdornment:
                    <InputAdornment
                      position="end"
                      classes={{
                        positionEnd: "0px"
                      }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>,
                }}
                sx={{
                  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                    width: "85%"
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#6B7280",
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "#2E8DC8",
                    },
                  },
                }}
              />
            )}
          />
          {passwordError ?
            <Alert
              severity="error"
            >
              {passwordError}
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
              loginMutation.isLoading ? (
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
            {loginMutation.isLoading ? '' : 'Continue'}
          </Button>
        </Box>
        <Box>
          <Divider
            light
            sx={{
              marginTop: "48px"
            }}/>
        </Box>
        <Box>
          <Link
            component="button"
            underline="none"
            disabled={resetPasswordStartMutation.isLoading}
            sx={{
              height: "40px",
              color: "#2E8DC8",
              fontFamily: "Anek Latin",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "24px",
              marginTop: "16px",
              "&[disabled]": {
                color: "grey",
                cursor: "default",
                "&:hover": {
                  textDecoration: "none"
                }
              }
            }}
            onClick={onResetPassword}
          >
            Reset your password
          </Link>
        </Box>
        <Box>
          <Link
            component="button"
            underline="none"
            sx={{
              color: "#2E8DC8",
              fontFamily: "Anek Latin",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "24px",
              height: "40px",
              marginTop: "8px",
            }}
            onClick={() => {
              setPassword('')
              setPasswordError('')
              setStep(Steps.EmailCheck)
            }}
          >
            Sign in to a different account
          </Link>
        </Box>
      </Paper>
    </form>
  )
})
