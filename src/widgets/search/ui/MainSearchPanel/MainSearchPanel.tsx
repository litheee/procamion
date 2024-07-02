'use client'

import { FormProvider, useForm } from 'react-hook-form'
import cn from 'classnames'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { RouteAutocomplete } from '@/features/route'
import { CargoParamsFilter } from '@/features/cargo'
import { Button, DatePicker } from '@/shared/ui'

import classes from './MainSearchPanel.module.scss'

const schema = z.object({
  departure: z.string(),
  destinations: z.string(),
  departureDate: z.string().date(),
  priceRange: z.number().array().length(2),
  palletsNumberRange: z.number().array().length(2),
  temperatureRange: z.number().array().length(2)
})

type FormSchemaType = z.infer<typeof schema>

export const MainSearchPanel = () => {
  const useFormProps = useForm<FormSchemaType>({
    defaultValues: {
      priceRange: [undefined, undefined],
      palletsNumberRange: [undefined, undefined],
      temperatureRange: [undefined, undefined]
    },
    resolver: zodResolver(schema)
  })

  return (
    <FormProvider {...useFormProps}>
      <form>
        <div className={cn(classes.searchCard, 'card', 'noBorder')}>
          <Typography fontSize={24} fontWeight={700}>
            Search
          </Typography>

          <div className={classes.routeSearch}>
            <InputLabel>Select a route</InputLabel>

            <RouteAutocomplete />
          </div>

          <FormControl className={classes.departureDate}>
            <InputLabel htmlFor='departureDate'>Select a departure date</InputLabel>

            <DatePicker id='departureDate' name='departureDate' placeholder='Date'></DatePicker>
          </FormControl>

          <Button fullWidth size='large' type='submit'>
            Find out more
          </Button>
        </div>

        <div className={classes.cargoParamsContainer}>
          <Typography fontSize={20} fontWeight={700}>
            Settings
          </Typography>

          <div className={classes.cargoParams}>
            <CargoParamsFilter />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
