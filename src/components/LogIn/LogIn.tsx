import {memo, useEffect, useState} from 'react';
import type { FC } from 'react';
import resets from '../resets.module.css';
import {BackGround} from './BackGround/BackGround';
import classes from './LogIn.module.css';
import { Controller, useForm } from 'react-hook-form';
import {useMutation} from "react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent, Chip,
  CircularProgress, Divider, IconButton, InputAdornment, Link, Stack, TextField, Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface Props {
  className?: string;
  hide?: {
    fiEye?: boolean;
  };
}

enum Steps {
  EmailCheck,
  Login,
  TryAgainLater,
  PasswordReset,
}

type LoginReponse = {
  status: number
  details: string
}

export const LogIn: FC<Props> = memo(function LogIn(props = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(Steps.EmailCheck)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { handleSubmit, control, reset, formState: { errors } } = useForm()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  };

  const checkEmail = async (): Promise<LoginReponse> => {
    let response: LoginReponse = {
      status: 400,
      details: 'Server error'
    };

    setEmailError('')
    setPasswordError('')

    await fetch('https://dev.cleantime-co.com/admin/api/v1/auth/email_check?email=' + encodeURIComponent(email), {
      method: 'POST',
    }).then((resp) => {
      response.status = resp.status
      return resp.json()
    }).then(jsonData => {})
      .catch(err => {
      response.details = 'Server is unavailable, try again later'
    })

    return response;
  };

  const login = async (): Promise<LoginReponse> => {
    let response: LoginReponse = {
      status: 400,
      details: 'Server error'
    };

    setPasswordError('')

    await fetch('https://dev.cleantime-co.com/admin/api/v1/auth/access-token', {
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
    }).catch(err => {
      response.details = 'Server is unavailable, try again later'
    })

    return response
  };

  const checkEmailMutation = useMutation(checkEmail, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setStep(Steps.Login)
          break

        case 400:
          setEmailError(response.details)
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
      setErrorMessage('Error occured while communicating server')
      console.warn(error)
    },
    onSettled: () => {
      //queryClient.invalidateQueries('create');
    }
  });

  const loginMutation = useMutation(login, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          console.log('succeeded')
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
      setErrorMessage('Error occured while communicating server')
      console.warn(error)
    },
    onSettled: () => {
      //queryClient.invalidateQueries('create');
    }
  });

  const onSubmit = () => {
    switch (step) {
      case Steps.EmailCheck:
        if (email.trim() === '') {
          setEmailError('Please enter email address')
        } else {
          checkEmailMutation.mutate()
        }
        break

      case Steps.Login:
        if (password.trim() === '') {
          setPasswordError('Please enter a password')
        } else {
          loginMutation.mutate()
        }
        break

      case Steps.TryAgainLater:
        setEmail('')
        setPassword('')
        setEmailError('')
        setPasswordError('')
        setStep(Steps.EmailCheck)
        break

      default:
        break
    }
  }

  useEffect(() => {
    setIsLoading(checkEmailMutation.isLoading || loginMutation.isLoading)
  }, [checkEmailMutation.isLoading, loginMutation.isLoading])

  return (
    <div className={`${resets.ctResets} ${classes.root}`}>
      <BackGround className={classes.bG} />
      <div className={classes.logo}></div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ maxWidth: 481 }} className={classes.content}>
          <CardContent className={classes.inner}>
            {step === Steps.TryAgainLater ?
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                <mask id="mask0_88_46105" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
                  <rect width="64" height="64" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_88_46105)">
                  <path d="M9.13447 54.6666C8.68247 54.6666 8.27654 54.5561 7.91667 54.3351C7.5568 54.1142 7.27691 53.823 7.077 53.4615C6.86905 53.1025 6.75467 52.7136 6.73387 52.2948C6.71307 51.876 6.82607 51.4612 7.07287 51.0505L29.9015 11.6163C30.1483 11.2056 30.4572 10.9019 30.8281 10.7053C31.1991 10.5087 31.5897 10.4104 31.9999 10.4104C32.4102 10.4104 32.8008 10.5087 33.1717 10.7053C33.5427 10.9019 33.8515 11.2056 34.0983 11.6163L56.927 51.0505C57.1738 51.4612 57.2868 51.876 57.266 52.2948C57.2452 52.7136 57.1308 53.1025 56.9229 53.4615C56.723 53.823 56.4431 54.1142 56.0832 54.3351C55.7233 54.5561 55.3174 54.6666 54.8654 54.6666H9.13447ZM11.8666 50.6667H52.1333L31.9999 16L11.8666 50.6667ZM31.9999 47.4871C32.6102 47.4871 33.1217 47.2807 33.5345 46.8679C33.9473 46.4551 34.1537 45.9436 34.1537 45.3333C34.1537 44.7231 33.9473 44.2115 33.5345 43.7987C33.1217 43.3859 32.6102 43.1795 31.9999 43.1795C31.3897 43.1795 30.8781 43.3859 30.4653 43.7987C30.0525 44.2115 29.8461 44.7231 29.8461 45.3333C29.8461 45.9436 30.0525 46.4551 30.4653 46.8679C30.8781 47.2807 31.3897 47.4871 31.9999 47.4871ZM32.0008 40.5129C32.5677 40.5129 33.0426 40.3212 33.4255 39.9379C33.8084 39.5545 33.9999 39.0796 33.9999 38.5129V29.1795C33.9999 28.6128 33.8081 28.1378 33.4247 27.7545C33.0412 27.3712 32.566 27.1795 31.9991 27.1795C31.4321 27.1795 30.9572 27.3712 30.5743 27.7545C30.1914 28.1378 30 28.6128 30 29.1795V38.5129C30 39.0796 30.1917 39.5545 30.5752 39.9379C30.9587 40.3212 31.4339 40.5129 32.0008 40.5129Z" fill="#9CA3AF"/>
                </g>
              </svg>
              : null}
            <Typography gutterBottom variant="h5" component="div">
              <div className={classes.title}>
                {step === Steps.EmailCheck ?
                  'Sign in'
                  : ''}
                {step === Steps.Login ?
                  'Enter your password'
                  : ''}
                {step === Steps.PasswordReset ?
                  'Verify your identity'
                  : ''}
                {step === Steps.TryAgainLater ?
                  'Try again later'
                  : ''}
              </div>
            </Typography>
            {step === Steps.TryAgainLater ?
              <span>
                <Typography gutterBottom component="div">
                  Your account has been blocked due to multiple failed login attemts. Please try again later.
                </Typography>
                <Typography gutterBottom component="div">
                  After waiting, if you still do not remember your password, select “Forgot password” and follow the prompts to reset your password.
                </Typography>
                <Typography gutterBottom component="div">
                  Repeated failed login attempts will trigger a linger account lockout.
                </Typography>
              </span>
            : null}
            {step === Steps.PasswordReset ?
              <span>
                <Typography gutterBottom component="div">
                  We've sent you a verification link to {email}.Please follow the link to confirm your identity
                </Typography>
                <Divider light />
              </span>
              : null}
            {step === Steps.Login ?
              <div>
                <Chip className={classes.email_chip}
                  label={email}
                  variant="outlined"
                  sx={{
                    height: 32,
                    maxWidth: 385,
                    borderRadius: 1,
                    borderColor: "#95979F",
                    fontFamily: "Anek Latin, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    color: "#474A58",
                    lineHeight: "140.5%",
                  }}
                />
              </div>
              : null}
            <Stack spacing={2}>
              <Box>
                {step === Steps.EmailCheck ?
                  <div className={classes.email}>
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
                                  floatingLabelFocusStyle: {
                                    color: "#2E8DC8",
                                  },
                                  fontFamily: "Anek Latin",
                                  fontStyle: "normal",
                                  fontWeight: "400",
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
                    {emailError ?
                      <div className={classes.helper_alert}>
                        <Alert
                          sx={{
                            backgroundColor: "white",
                            color: "#B91C1C",
                            fontSize: "12px",
                            padding: "0",
                          }}
                          severity="error">{emailError}</Alert>
                      </div>
                      : null}
                  </div>
                  : ''}
                {step === Steps.Login ?
                  <div className={classes.email}>
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
                              floatingLabelFocusStyle: {
                                color: "#2E8DC8",
                              },
                              fontFamily: "Anek Latin",
                              fontStyle: "normal",
                              fontWeight: "400",
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
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
                          aria-describedby="base-name-helper-text"
                        />
                      )}
                    />
                    {passwordError ?
                      <div className={classes.helper_alert}>
                        <Alert
                          sx={{
                            backgroundColor: "white",
                            color: "#B91C1C",
                            fontSize: "12px",
                            padding: "0",
                          }}
                          severity="error">{passwordError}</Alert>
                      </div>
                      : null}
                  </div>
                  : ''}
              </Box>
              <Box>
                {[Steps.EmailCheck, Steps.Login].includes(step) ?
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    startIcon={
                      isLoading ? (
                        <div className={classes.button_next}>
                          <CircularProgress size={25} style={{'color': 'white',  position: 'absolute', left: '40%',}} />
                        </div>
                      ) : null
                    }>
                    {isLoading ? '' : <div className={classes.button_next}>Continue</div>}
                  </Button>
                  : null}
                {step === Steps.TryAgainLater ?
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained">
                    <div className={classes.button_next}>Got it</div>
                  </Button>
                  : null}
              </Box>
              {[Steps.Login, Steps.PasswordReset].includes(step) ?
                <span>
                  <Divider
                    light
                    sx={{
                      paddingTop: "34px"
                    }}/>
                  {step === Steps.Login ?
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
                        paddingTop: "20px"
                      }}
                      onClick={() => {
                        setPassword('')
                        setEmailError('')
                        setPasswordError('')
                        setStep(Steps.PasswordReset)
                      }}>Reset your password</Link>
                    : null}
                  {step === Steps.PasswordReset ?
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
                      }}
                      onClick={() => {
                        setPassword('')
                        setEmailError('')
                        setPasswordError('')
                        setStep(Steps.PasswordReset)
                      }}>Resend link</Link>
                    : null}
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
                      paddingTop: "26px"
                    }}
                    onClick={() => {
                      setEmail('')
                      setPassword('')
                      setEmailError('')
                      setPasswordError('')
                      setStep(Steps.EmailCheck)
                    }}>Sign in to a different account</Link>
                </span>
                : null}
            </Stack>
          </CardContent>
        </Card>
      </form>
      {errorMessage && <Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}
    </div>
  );
});

