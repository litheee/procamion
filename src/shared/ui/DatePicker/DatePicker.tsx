'use client'

import { Controller, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import dayjs, { type Dayjs } from 'dayjs'
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps
} from '@mui/x-date-pickers/DatePicker'

import { unformatDate } from '@/shared/utils'

import classes from './DatePicker.module.scss'
import { CalendarIcon } from '../../../../public/icons/Calendar'

type DatePickerProps = MuiDatePickerProps<Dayjs> & {
  id?: string
  name: string
  placeholder?: string
}

export const DatePicker = ({ id, name, placeholder, ...props }: DatePickerProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={{ required: true }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => {
        return (
          <MuiDatePicker
            {...props}
            slotProps={{
              textField: {
                id,
                placeholder
              }
            }}
            format='DD.MM.YYYY'
            slots={{ openPickerIcon: CalendarIcon }}
            className={cn(classes.datePicker, {
              [classes.error]: Boolean(error)
            })}
            inputRef={ref}
            value={dayjs(value).isValid() ? dayjs(value) : null}
            onChange={(value) => {
              if (!dayjs(value).isValid()) return onChange(value)

              return onChange(unformatDate(dayjs(value).toDate()))
            }}
          />
        )
      }}
    />
  )
}