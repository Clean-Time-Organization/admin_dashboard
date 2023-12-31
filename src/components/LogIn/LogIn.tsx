import {memo, useEffect, useState} from 'react';
import type { FC } from 'react';
import {BackGround} from './BackGround/BackGround';
import {
  Alert,
  Box, CssBaseline,
  Stack, ThemeProvider
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {EmailCheck} from "./Steps/EmailCheck";
import {PasswordLogin} from "./Steps/PasswordLogin";
import {PasswordResetStart} from "./Steps/PasswordResetStart";
import {PasswordResetNext} from "./Steps/PasswordResetNext";
import {PasswordResetSuccess} from "./Steps/PasswordResetSuccess";
import theme from "./Styles/Theme";

export enum Steps {
  EmailCheck,
  PasswordLogin,
  PasswordResetStart,
  PasswordResetNext,
  PasswordResetSuccess,
}

export type LoginApiReponse = {
  status: number
  details: string
  accessLifetime?: number
  accessToken?: string
  refreshLifetime?: number
  refreshToken?: string
  tokenType?: string
}

export const LogIn: FC = memo(function LogIn() {
  const [step, setStep] = useState(Steps.EmailCheck)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [tmpToken, setTmpToken] = useState('')
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      setStep(Steps.PasswordResetNext)
    }
  }, [token])

  const onGoToPasswordReset = (tmpToken: string) => {
    navigate(`/login/${tmpToken}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          alignItems: "flex-start",
          backgroundColor: "#fff",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <BackGround/>
        <Stack
          direction="row"
          spacing={2}
          style={{
            position: "absolute",
            left: "4.5%",
            top: "30%",
            transform: "translateX-50%",
            gap: "291px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 177,
              width: 300,
              //maxHeight: { xs: 233, md: 167 },
              //maxWidth: { xs: 350, md: 250 },
              position: "relative",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            src="/assets/logo.png"
          >
          </Box>
          {step === Steps.EmailCheck ?
            <EmailCheck
              setParentData={setEmail}
              setStep={setStep}
              setErrorMessage={setErrorMessage} />
            : null}
          {step === Steps.PasswordLogin ?
            <PasswordLogin
              setStep={setStep}
              email={email}
              setParentTmpToken={setTmpToken}
              setErrorMessage={setErrorMessage} />
            : null}
          {step === Steps.PasswordResetStart ?
            <PasswordResetStart
              parentTmpToken={tmpToken}
              email={email}
              setStep={setStep}
              onParentGoToPasswordReset={onGoToPasswordReset}
              setErrorMessage={setErrorMessage} />
            : null}
          {step === Steps.PasswordResetNext ?
            <PasswordResetNext
              token={token}
              setStep={setStep}
              setErrorMessage={setErrorMessage} />
            : null}
          {step === Steps.PasswordResetSuccess ?
            <PasswordResetSuccess
              setStep={setStep} />
            : null}
        </Stack>
        {errorMessage && <Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}
      </Box>
    </ThemeProvider>
  );
});

