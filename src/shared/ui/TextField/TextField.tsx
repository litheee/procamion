'use client'

import { Controller, type FieldValues, type RegisterOptions, useFormContext } from 'react-hook-form'
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

import './TextField.scss'

type Rules = Omit<
  RegisterOptions<FieldValues, string>,
  'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
>

type TextFieldProps = MuiTextFieldProps & {
  name: string
  rules?: Rules
}

export const TextField = ({
  name,
  InputProps,
  rules = { required: true },
  ...props
}: TextFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue=''
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <MuiTextField
            fullWidth
            helperText={error && error.message !== 'Required' ? error.message : null}
            error={Boolean(error)}
            variant='outlined'
            {...props}
            InputProps={{
              ...InputProps,
              classes: {
                root: 'text-field-root',
                input: 'text-field-input',
                error: 'text-field-input-error',
                notchedOutline: 'text-field-fieldset'
              }
            }}
            value={value}
            onChange={onChange}
          />
        )
      }}
    />
  )
}

export const TextFieldUncontrolled = (props: MuiTextFieldProps) => {
  return (
    <MuiTextField
      fullWidth
      variant='outlined'
      InputProps={{
        classes: {
          root: 'text-field-root',
          input: 'text-field-input',
          error: 'text-field-input-error',
          notchedOutline: 'text-field-fieldset'
        }
      }}
      {...props}
    />
  )
}
