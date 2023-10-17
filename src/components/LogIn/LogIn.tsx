import { memo } from 'react';
import type { FC } from 'react';

import resets from '../resets.module.css';
import {BackGround} from './BackGround/BackGround';
import classes from './LogIn.module.css';
import {LoadingButton} from "../Form/LoadingButton/LoadingButton";
import {TextInput} from "../Form/TextInput/TextInput";
import { useForm } from 'react-hook-form';
import {useMutation} from "react-query";
import {Box, TextField} from "@mui/material";

interface Props {
  className?: string;
  hide?: {
    fiEye?: boolean;
  };
}

type LoginFormData = {
  step: number
  email: string
  password: string
}

export const LogIn: FC<Props> = memo(function LogIn(props = {}) {
  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      step: 1,
      email: '',
      password: ''
    }
  });

  const validationSchema = {
    required: "Email is required",
      minLength: {
      value: 3,
        message: "Please enter a minimum of 3 characters"
    }
  }

  const getEmailInfo = async (data: LoginFormData) => {
    const response = await fetch('https://dev.cleantime-co.com/admin/api/v1/auth/email_check', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  };

  //const { mutate, isLoading }  = useMutation(getEmailInfo);

  const onSubmit = (data: LoginFormData) => {
    console.dir(data);

    // mutate(data, {
    //   onSuccess: (data) => {
    //     console.dir(data)
    //   },
    //   onError: (error) => {
    //     console.dir(error)
    //   },
    // })
    //
    // return { mutate, isLoading };
  }


  return (
    <div className={`${resets.ctResets} ${classes.root}`}>
      <BackGround className={classes.bG} />
      <div className={classes.content}>
        <div className={classes.titleSignIn}>
          <div className={classes.signIn}>Sign in</div>
        </div>
        <div className={classes.inputs}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
              <TextField id="outlined-basic" label="Email" variant="outlined" />
            </Box>

            {/*<TextInput*/}
            {/*  name={'email'}*/}
            {/*  label={'Email'}*/}
            {/*  type={'text'}*/}
            {/*  register={register}*/}
            {/*  validationSchema={validationSchema}*/}
            {/*  className={classes.textField}*/}
            {/*  classes={{ inputText: classes.inputText }}*/}
            {/*  hide={{*/}
            {/*    supportingText: false,*/}
            {/*  }}*/}
            {/*  text={{*/}
            {/*    labelText: <div className={classes.inputLabelText}>Email</div>,*/}
            {/*  }}*/}
            {/*/>*/}
            <LoadingButton
              text={{
                labelText: <div className={classes.buttonlabelText}>Continue</div>,
              }}
            />
          </form>
        </div>
      </div>
      <div className={classes.logo}></div>
    </div>
  );
});

