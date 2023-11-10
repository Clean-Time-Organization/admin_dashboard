import {memo, useState} from 'react';
import type { FC } from 'react';
import {Box, Button, Divider, Link, Paper, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {LoginApiReponse, Steps} from "../LogIn";
import {useMutation} from "react-query";

interface Props {
  parentTmpToken: string
  email: string
  setStep: (value: Steps) => void
  onParentGoToPasswordReset: (value: string) => void
  setErrorMessage: (value: string) => void
}

export const PasswordResetStart: FC<Props> = memo(function PasswordResetStart({parentTmpToken, email, setStep, onParentGoToPasswordReset, setErrorMessage}) {
  const env = import.meta.env

  const [tmpToken, setTmpToken] = useState('')
  const { handleSubmit } = useForm()

  const resetPasswordStart = async (): Promise<LoginApiReponse> => {
    let response: LoginApiReponse = {
      status: 400,
      details: 'Server error'
    }

    setTmpToken('')

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
        setTmpToken(jsonData.tmp_token)
      }
    }).catch(err => {
      response.details = 'Server is unavailable, please try again later'
    })

    return response
  }

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

  const onResetPassword = () => {
    resetPasswordStartMutation.mutate()
  }

  const onGoToPasswordReset = () => {
    onParentGoToPasswordReset(tmpToken ? tmpToken : parentTmpToken)
  }

  const onSubmit = () => {
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Paper
        variant="box"
      >
        <Box
        >
          <Typography
            gutterBottom
            component="div"
            variant="h1"
            style={{
              lineHeight: "42px",
              marginBottom: "5px",
            }}
          >
            Verify your identity
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: "48px",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            variant="h2"
            style={{
              flexDirection: "column",
              display: "flex",
            }}
          >
            We've sent you a verification link to
            <Typography
              gutterBottom
              component="div"
              variant="h2"
              style={{
                fontWeight: "600",
                marginBottom: "0px",
              }}
            >
              {email}.
              <span
                style={{
                  fontWeight: "400",
                }}>
                 Please follow the link to confirm your identity
              </span>
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Divider light />
        </Box>
        {/*{env.MODE && env.MODE === 'development' ?*/}
        {/*  <Box*/}
        {/*    display="flex"*/}
        {/*    justifyContent="flex-end"*/}
        {/*  >*/}
        {/*    <Button*/}
        {/*      variant="contained"*/}
        {/*      disableElevation={true}*/}
        {/*      style={{*/}
        {/*        backgroundColor: "#2E8DC8",*/}
        {/*        borderRadius: "4px",*/}
        {/*        padding: "0px",*/}
        {/*        margin: "0px",*/}
        {/*        maxWidth: "185px",*/}
        {/*        maxHeight: "40px",*/}
        {/*        minWidth: "185px",*/}
        {/*        minHeight: "40px",*/}
        {/*        fontFamily: "Anek Latin",*/}
        {/*        fontSize: "16px",*/}
        {/*        fontStyle: "normal",*/}
        {/*        fontWeight: "500",*/}
        {/*        lineHeight: "24px",*/}
        {/*        textTransform: "capitalize",*/}
        {/*      }}*/}
        {/*      onClick={onGoToPasswordReset}*/}
        {/*    >*/}
        {/*      Go to password reset*/}
        {/*    </Button>*/}
        {/*  </Box>*/}
          {/*: null}*/}
        <Box>
          <Link
            component="button"
            underline="none"
            disabled={resetPasswordStartMutation.isLoading}
            sx={{
              color: "#2E8DC8",
              fontFamily: "Anek Latin",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "24px",
              marginTop: "26px",
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
            Resend link
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
              marginTop: "18px",
            }}
            onClick={() => {
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
