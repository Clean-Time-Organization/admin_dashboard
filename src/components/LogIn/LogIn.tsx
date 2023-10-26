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
import {useNavigate, useParams} from "react-router-dom";

interface Props {
  className?: string;
  token?: string;
}

enum Steps {
  EmailCheck,
  Login,
  TryAgainLater,
  PasswordResetStart,
  PasswordResetNext,
  PasswordResetSuccess,
}

type LoginReponse = {
  status: number
  details: string
}

export const LogIn: FC<Props> = memo(function LogIn(props = {}) {
  const env = import.meta.env;

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(Steps.EmailCheck)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [tmpToken, setTmpToken] = useState('')
  const { handleSubmit, control, reset, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const { token } = useParams();

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

    await fetch(`${env.VITE_API_BASE_URL}/auth/email_check?email=${encodeURIComponent(email)}`, {
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
    }).catch(err => {
      response.details = 'Server is unavailable, try again later'
    })

    return response
  };

  const resetPasswordStart = async (): Promise<LoginReponse> => {
    let response: LoginReponse = {
      status: 400,
      details: 'Server error'
    };

    setPassword('')
    setEmailError('')
    setPasswordError('')
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
      response.details = 'Server is unavailable, try again later'
    })

    return response;
  };

  const resetPasswordNext = async (): Promise<LoginReponse> => {
    let response: LoginReponse = {
      status: 400,
      details: 'Server error'
    };

    setEmailError('')
    setPasswordError('')
    setTmpToken('')

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
            break;

          case 'value_error.any_str.min_length':
            response.details = 'Please choose a stronger password. It should contain at least 8 characters'
            break;

          default:
            response.details = 'Weak password'
            break;
        }
      }
    }).catch(err => {
      response.details = 'Server is unavailable, try again later'
    })

    return response;
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
      setErrorMessage('Error occurred while communicating server')
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
          //setAccessToken
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
    onSettled: () => {
      //queryClient.invalidateQueries('create');
    }
  });

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
    onSettled: () => {
      //queryClient.invalidateQueries('create');
    }
  });

  const resetPasswordNextMutation = useMutation(resetPasswordNext, {
    onSuccess: response => {
      switch (response.status) {
        case 200:
          setPassword('')
          setStep(Steps.PasswordResetSuccess)
          break

        case 403:
          setPasswordError(response.details)
          break

        case 404:
          setErrorMessage("Couldn't find your account")
          break

        case 400:
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

      case Steps.PasswordResetNext:
        if (password.trim() === '') {
          setPasswordError('Please enter a password')
        } else {
          resetPasswordNextMutation.mutate()
        }
        break

      default:
        break
    }
  }

  const onResetPassword = () => {
    resetPasswordStartMutation.mutate()
  }

  const onGoToPasswordReset = () => {
    setPasswordError('')
    navigate(`/login/${tmpToken}`)
  }

  const onGoToSignIn = () => {
    setStep(Steps.EmailCheck)
    setEmail('')
    setEmailError('')
    setPassword('')
    setPasswordError('')
    navigate('/login')
  }

  useEffect(() => {
    setIsLoading(checkEmailMutation.isLoading || loginMutation.isLoading || resetPasswordNextMutation.isLoading)
  }, [checkEmailMutation.isLoading, loginMutation.isLoading, resetPasswordNextMutation.isLoading])

  useEffect(() => {
    if (token) {
      setStep(Steps.PasswordResetNext)
    }
  }, [token])

  return (
    <div className={`${resets.ctResets} ${classes.root}`}>
      <BackGround className={classes.bG} />
      <div className={classes.logo}></div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ maxWidth: 481 }} className={classes.content}>
          <CardContent className={classes.inner}>
            {step === Steps.PasswordResetSuccess ?
              <Box
                sx={{
                  paddingBottom: "48px"
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <mask id="mask0_88_45188" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
                    <rect width="64" height="64" fill="#D9D9D9"/>
                  </mask>
                  <g mask="url(#mask0_88_45188)">
                    <path d="M32.0047 57.3333C28.5009 57.3333 25.2075 56.6684 22.1245 55.3386C19.0414 54.0088 16.3596 52.2042 14.079 49.9246C11.7984 47.645 9.99288 44.9644 8.66253 41.8827C7.33217 38.801 6.66699 35.5083 6.66699 32.0045C6.66699 28.5007 7.33199 25.2072 8.66199 22.1242C9.99199 19.0411 11.797 16.3593 14.077 14.0788C16.357 11.7981 19.0381 9.99264 22.1203 8.66228C25.2025 7.33193 28.4958 6.66675 32.0003 6.66675C34.2191 6.66675 36.3695 6.94966 38.4515 7.51548C40.5336 8.0813 42.5251 8.89926 44.4259 9.96935C44.9387 10.2565 45.2738 10.6702 45.4311 11.2104C45.5883 11.7505 45.496 12.2548 45.1541 12.7231C44.8123 13.1915 44.3601 13.4847 43.7977 13.6026C43.2354 13.7206 42.6927 13.636 42.1696 13.3488C40.6106 12.477 38.9704 11.812 37.249 11.3539C35.5276 10.8957 33.778 10.6667 32.0003 10.6667C26.0891 10.6667 21.0558 12.7445 16.9003 16.9C12.7447 21.0556 10.6669 26.0889 10.6669 32C10.6669 37.9111 12.7447 42.9445 16.9003 47.1C21.0558 51.2556 26.0891 53.3334 32.0003 53.3334C37.9114 53.3334 42.9447 51.2556 47.1003 47.1C51.2558 42.9445 53.3336 37.9111 53.3336 32C53.3336 31.4839 53.3139 30.984 53.2746 30.5001C53.2353 30.0163 53.1678 29.5196 53.0721 29.0102C52.9832 28.4424 53.0806 27.8995 53.3643 27.3818C53.6481 26.864 54.0753 26.5282 54.6459 26.3743C55.1829 26.2205 55.6814 26.2872 56.1412 26.5744C56.601 26.8615 56.8754 27.2752 56.9643 27.8153C57.0873 28.4889 57.1796 29.1701 57.2412 29.8592C57.3028 30.5482 57.3335 31.2618 57.3335 32C57.3335 35.5045 56.6686 38.7978 55.3389 41.8799C54.0091 44.9622 52.2044 47.6433 49.9249 49.9233C47.6453 52.2033 44.9646 54.0083 41.8829 55.3383C38.8013 56.6683 35.5085 57.3333 32.0047 57.3333ZM28.2157 37.7232L53.1182 12.7795C53.4874 12.4103 53.9447 12.2146 54.49 12.1924C55.0353 12.1702 55.5166 12.3678 55.934 12.7851C56.3166 13.1677 56.5079 13.6342 56.5079 14.1847C56.5079 14.7351 56.3147 15.2034 55.9284 15.5898L29.9028 41.6563C29.4207 42.1384 28.8584 42.3794 28.2157 42.3794C27.5729 42.3794 27.0105 42.1384 26.5285 41.6563L19.2105 34.3384C18.8413 33.9692 18.6524 33.5051 18.6439 32.9461C18.6353 32.3872 18.8242 31.9146 19.2105 31.5283C19.5968 31.1419 20.0652 30.9487 20.6157 30.9487C21.1661 30.9487 21.6344 31.1419 22.0207 31.5283L28.2157 37.7232Z" fill="#9CA3AF"/>
                  </g>
                </svg>
              </Box>
              : null}
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                color: "#1f2937",
                fontSize: "28px",
                lineHeight: "36px",
                fontWeight: "600",
                fontFamily: "Anek Latin",
                width: "min-content",
                height: "min-content",
                whiteSpace: "nowrap",
                marginBottom: "40px",
              }}
            >
              {step === Steps.EmailCheck ?
                'Sign in'
                : ''}
              {step === Steps.Login ?
                'Enter your password'
                : ''}
              {step === Steps.PasswordResetStart ?
                'Verify your identity'
                : ''}
              {step === Steps.PasswordResetNext ?
                'Reset your password'
                : ''}
              {step === Steps.PasswordResetSuccess ?
                'Your password has been updated!'
                : ''}
              {step === Steps.TryAgainLater ?
                'Try again later'
                : ''}
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
            {step === Steps.PasswordResetStart ?
              <span>
                <Typography
                  gutterBottom
                  component="div"
                  style={{
                    fontFamily: "Anek Latin",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "24px",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >We've sent you a verification link to
                  <Typography
                    gutterBottom
                    component="div"
                    style={{
                      fontFamily: "Anek Latin",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "24px",
                      marginBottom: "0px",
                    }}
                  >{email}.
                  </Typography>
                  Please follow the link to confirm your identity
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
                                  fontFamily: "Anek Latin",
                                  fontStyle: "normal",
                                  fontWeight: "400",
                                }
                              }}
                              fullWidth
                              error={!!emailError}
                              defaultValue={email}
                              onChange={e => setEmail(e.target.value)}
                              onFocus={e => setEmailError('')}
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
                {[Steps.Login, Steps.PasswordResetNext].includes(step) ?
                  <div className={classes.email}>
                    <Controller
                      control={control}
                      name="password"
                      defaultValue={password}
                      render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <TextField
                          id={field.name}
                          label={step === Steps.Login ? "Password" : "New password"}
                          InputLabelProps={{
                            shrink: true,
                            style: {
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
                            "& .css-1pxa9xg-MuiAlert-message": {
                              width: "349px"
                            },
                          }}
                          severity="error">{passwordError}</Alert>
                      </div>
                      : null}
                  </div>
                  : ''}
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-end"
              }}>
                {[Steps.EmailCheck, Steps.Login].includes(step) ?
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
                      isLoading ? (
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
                    {isLoading ? '' : 'Continue'}
                  </Button>
                  : null}
                {step === Steps.PasswordResetNext ?
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation={true}
                    style={{
                      backgroundColor: "#2E8DC8",
                      borderRadius: "4px",
                      padding: "0px",
                      margin: "0px",
                      maxWidth: "172px",
                      maxHeight: "40px",
                      minWidth: "172px",
                      minHeight: "40px",
                      fontFamily: "Anek Latin",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "24px",
                      textTransform: "capitalize",
                    }}
                    startIcon={
                      isLoading ? (
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
                    {isLoading ? '' : 'Reset password'}
                  </Button>
                  : null}
                {step === Steps.TryAgainLater ?
                  <Button
                    className={classes.button}
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
                  >
                    Got it
                  </Button>
                  : null}
                {step === Steps.PasswordResetStart ?
                  <Button
                    className={classes.button}
                    variant="contained"
                    disableElevation={true}
                    style={{
                      backgroundColor: "#2E8DC8",
                      borderRadius: "4px",
                      padding: "0px",
                      margin: "0px",
                      maxWidth: "185px",
                      maxHeight: "40px",
                      minWidth: "185px",
                      minHeight: "40px",
                      fontFamily: "Anek Latin",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "24px",
                      textTransform: "capitalize",
                    }}
                    onClick={onGoToPasswordReset}
                  >
                    Go to password reset
                  </Button>
                  : null}
                {step === Steps.PasswordResetSuccess ?
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    disableElevation={true}
                    style={{
                      backgroundColor: "#2E8DC8",
                      borderRadius: "4px",
                      padding: "0px",
                      margin: "0px",
                      maxWidth: "148px",
                      maxHeight: "40px",
                      minWidth: "148px",
                      minHeight: "40px",
                      fontFamily: "Anek Latin",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "24px",
                      textTransform: "capitalize",
                    }}
                    onClick={onGoToSignIn}
                  >
                    Go to Sign in
                  </Button>
                  : null}
              </Box>
              {[Steps.Login, Steps.PasswordResetStart].includes(step) ?
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
                      disabled={resetPasswordStartMutation.isLoading}
                      sx={{
                        color: "#2E8DC8",
                        fontFamily: "Anek Latin",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "24px",
                        paddingTop: "26px",
                        "&[disabled]": {
                          color: "grey",
                          cursor: "default",
                          "&:hover": {
                            textDecoration: "none"
                          }
                        }
                      }}
                      onClick={onResetPassword}
                    >Reset your password</Link>
                    : null}
                  {step === Steps.PasswordResetStart ?
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
                        paddingTop: "26px",
                        "&[disabled]": {
                          color: "grey",
                          cursor: "default",
                          "&:hover": {
                            textDecoration: "none"
                          }
                        }
                      }}
                      onClick={onResetPassword}
                    >Resend link</Link>
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
                    }}
                  >Sign in to a different account</Link>
                </span>
                : null}
            </Stack>
          </CardContent>
        </Card>
      </form>
      {errorMessage &&
          <Alert
              severity="error"
              onClose={() => setErrorMessage('')}
          >{errorMessage}</Alert>
      }
    </div>
  );
});

