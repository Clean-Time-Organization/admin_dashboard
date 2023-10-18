import {memo, useState} from 'react';
import type { FC } from 'react';

import resets from '../resets.module.css';
import {BackGround} from './BackGround/BackGround';
import classes from './LogIn.module.css';
import { Controller, useForm } from 'react-hook-form';
import {useMutation} from "react-query";
import {Box, Button, Card, CardContent, CardHeader, FormControl, Stack, TextField, Typography} from "@mui/material";

interface Props {
  className?: string;
  hide?: {
    fiEye?: boolean;
  };
}

type LoginFormData = {
  email: string
  password: string
}

export const LogIn: FC<Props> = memo(function LogIn(props = {}) {
  const [step, setStep] = useState(1);

  const { handleSubmit, control, reset, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const checkEmail = async ({ email }: LoginFormData) => {
    const body = new FormData();
    body.append('email', email);

    const response = fetch('https://dev.cleantime-co.com/admin/api/v1/auth/email_check?email=123@f.com', {
      method: 'POST',
      // body: JSON.stringify({
      //   email
      // }),
      body
    }).then(response => response.json());

    // if (!response.ok) {
    //   throw new Error('Failed to update user');
    // }

    //return response.json();
  };

  const { mutate, isLoading }  = useMutation(checkEmail);

  const onSubmit = (data: LoginFormData) => {
    switch (step) {
      case 1:
        mutate(data, {
          onSuccess: (data) => {
            console.dir(data)
          },

          onError: (error) => {
            console.dir(error)
          },
        })

        break;

      case 2:
        reset();
        break;

      default:
        console.error('unknown step')
        break;
    }

    //return { mutate, isLoading };
  }


  return (
    <div className={`${resets.ctResets} ${classes.root}`}>
      <BackGround className={classes.bG} />
      <div className={classes.logo}></div>
      {/*<div className={classes.content}>*/}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sign in
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Controller
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      value={value}
                      onChange={onChange}
                      label="Email"
                      variant="outlined" />
                  )}
                  control={control}
                  defaultValue=""
                  name={'email'}
                />
              </Box>
              <Box>
                <Button type="submit" variant="contained">Continue</Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </form>
      {/*</div>*/}
    </div>
  );
});

