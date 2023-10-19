import {memo, useState} from 'react';
import type { FC } from 'react';
import resets from '../resets.module.css';
import {BackGround} from './BackGround/BackGround';
import classes from './LogIn.module.css';
import { Controller, useForm } from 'react-hook-form';
import {useMutation} from "react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography
} from "@mui/material";

interface Props {
  className?: string;
  hide?: {
    fiEye?: boolean;
  };
}

type CheckEmailReponse = {
  status: number
  data: {
    detail: any
  }
}

export const LogIn: FC<Props> = memo(function LogIn(props = {}) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleSubmit, control, reset, formState: { errors } } = useForm();

  const checkEmail = async (): Promise<CheckEmailReponse> => {
    let response: CheckEmailReponse = {
      status: 400,
      data: {
        detail: ''
      }
    };

    await fetch('https://dev.cleantime-co.com/admin/api/v1/auth/email_check?email=' + encodeURIComponent(email), {
      method: 'POST',
    }).then((resp) =>{
      response.status = resp.status;
      return resp.json()
    }).then(jsonData => {
      response.data = jsonData;
    }).catch(err => {
      response.data.detail = 'Server responds with error'
    })

    return response;
  };

  const { mutate, isLoading } = useMutation(checkEmail, {
    onSuccess: data => {
      console.log(data);
    },
    onError: (error) => {
      console.dir(error)
    },
    onSettled: () => {
      //queryClient.invalidateQueries('create');
    }
  });

  const onSubmit = () => {
    mutate();
  }

  return (
    <div className={`${resets.ctResets} ${classes.root}`}>
      <BackGround className={classes.bG} />
      <div className={classes.logo}></div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ maxWidth: 481 }} className={classes.content}>
          <CardContent className={classes.inner}>
            <Typography gutterBottom variant="h5" component="div">
              <div className={classes.title}>Sign in</div>
            </Typography>
            <Stack spacing={2}>
              <Box className={classes.input}>
                <Controller
                  control={control}
                  name="email"
                  defaultValue={email}
                  render={({ field: { ref, ...field }, fieldState: { error } }) => (
                    <TextField
                      id={field.name}
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      defaultValue={email}
                      onChange={e => setEmail(e.target.value)}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  disabled={email === ''}
                  startIcon={
                    isLoading ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : null
                  }>Continue</Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </div>
  );
});

