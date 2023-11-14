import {memo, useEffect, useState} from 'react';
import type { FC } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress, IconButton,
  InputAdornment, Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LoginApiReponse, Steps} from "../LogIn";
import {useMutation} from "react-query";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface Props {
  token: string | undefined
  setStep: (value: Steps) => void
  setErrorMessage: (value: string) => void
}

export const PasswordResetNext: FC<Props> = memo(function PasswordResetNext({token, setStep, setErrorMessage}) {
  const env = import.meta.env

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control } = useForm()

  useEffect(() => {
    setPasswordError('')
  }, [password])

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const resetPasswordNext = async (): Promise<LoginApiReponse> => {
    let response: LoginApiReponse = {
      status: 400,
      details: 'Server error'
    }

    await fetch(`${env.VITE_API_BASE_URL}/auth/reset-password`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tmp_token: token,
        new_password: password
      })
    }).then((resp) => {
      response.status = resp.status
      return resp.json()
    }).then(jsonData => {
      if (response.status === 422) {
        const detail = jsonData.detail[0]
        switch (detail.type.toLowerCase()) {
          case 'value_error':
            response.details = 'Token is invalid or has been expired'
            break

          case 'value_error.any_str.min_length':
            response.details = 'Please choose a stronger password. It should contain at least 8 characters'
            break

          default:
            response.details = 'Weak password'
            break
        }
      }
    }).catch(err => {
      response.details = 'Server is unavailable, please try again later'
    })

    return response
  }

  const resetPasswordNextMutation = useMutation(resetPasswordNext, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setStep(Steps.PasswordResetSuccess)
          break

        case 403:
          setPasswordError(response.details)
          break

        case 404:
          setErrorMessage("Couldn't find your account")
          break

        case 400:
          setErrorMessage(response.details)
          break

        case 422:
          setPasswordError(response.details)
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
      resetPasswordNextMutation.mutate()
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Paper
        variant="box"
      >
        <Box
          sx={{
            marginBottom: "48px",
          }}
        >
          <Typography
            gutterBottom
            variant="h1"
            component="div"
            style={{
              lineHeight: "42px",
              marginBottom: "0px",
            }}
          >
            Reset your password
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "68px",
          }}
        >
          <Controller
            control={control}
            name="password"
            defaultValue={password}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <TextField
                id={field.name}
                label="New password"
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
                type={showPassword ? 'text' : 'password'}
                error={!!passwordError}
                defaultValue={password}
                onChange={e => setPassword(e.target.value)}
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
          {passwordError ?
            <Alert
              variant="support"
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
            disabled={resetPasswordNextMutation.isLoading}
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
              resetPasswordNextMutation.isLoading ? (
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
            {resetPasswordNextMutation.isLoading ? '' : 'Continue'}
          </Button>
        </Box>
      </Paper>
    </form>
  )
})
