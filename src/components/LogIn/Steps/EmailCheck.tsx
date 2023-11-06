import {memo, useEffect, useState} from 'react';
import type { FC } from 'react';
import {Alert, Box, Button, CircularProgress, Paper, Stack, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LoginApiReponse, Steps} from "../LogIn";
import {useMutation} from "react-query";

interface Props {
  setParentData: (value: string) => void
  setStep: (value: Steps) => void
  setErrorMessage: (value: string) => void
}

export const EmailCheck: FC<Props> = memo(function EmailCheck({setParentData, setStep, setErrorMessage}) {
  const env = import.meta.env

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const { handleSubmit, control } = useForm()

  useEffect(() => {
    setEmailError('')
  }, [email])

  const checkEmail = async (): Promise<LoginApiReponse> => {
    let response: LoginApiReponse = {
      status: 400,
      details: 'Server error'
    }

    setEmailError('')

    await fetch(`${env.VITE_API_BASE_URL}/auth/email_check?email=${encodeURIComponent(email)}`, {
      method: 'POST',
    }).then((resp) => {
      response.status = resp.status
      return resp.json()
    }).then(jsonData => {})
      .catch(err => {
        response.details = 'Server is unavailable, please try again later'
      })

    return response
  }

  const checkEmailMutation = useMutation(checkEmail, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setParentData(email)
          setStep(Steps.PasswordLogin)
          break

        case 400:
          setErrorMessage(response.details)
          break

        case 404:
          setEmailError("Couldn't find your account")
          break

        case 422:
          setEmailError('Please enter a valid email address')
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
    if (email.trim() === '') {
      setEmailError('Please enter email address')
    } else {
      checkEmailMutation.mutate()
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
          >
            Sign in
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "32px",
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
                error={!!emailError}
                defaultValue={email}
                onChange={e => setEmail(e.target.value)}
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
          {emailError ?
            <Alert
              variant="support"
              severity="error"
            >
              {emailError}
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
            disabled={checkEmailMutation.isLoading}
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
              checkEmailMutation.isLoading ? (
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
            {checkEmailMutation.isLoading ? '' : 'Continue'}
          </Button>
        </Box>
      </Paper>
    </form>
  )
})
