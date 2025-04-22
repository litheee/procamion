'use client'

import { FormProvider, useForm } from 'react-hook-form'
import cn from 'classnames'
import { z } from 'zod'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import { RouteAutocomplete } from '@/features/route'
import { Button, DatePicker } from '@/shared/ui'
import { ROUTE_NAMES } from '@/shared/config'

import classes from './ApplicationSearch.module.scss'

const schema = z.object({
  departure: z.string(),
  departureCountry: z.string(),
  departureCity: z.string(),
  departureCountryCode: z.string(),
  arrival: z.string(),
  arrivalCountry: z.string(),
  arrivalCity: z.string(),
  arrivalCountryCode: z.string(),
  departureDate: z.string().nullish()
})

type FormSchema = z.infer<typeof schema>

type SubmitFields = Partial<{
  departure: string
  departureCountry: string
  departureCity: string
  departureCountryCode: string
  arrival: string
  arrivalCountry: string
  arrivalCity: string
  arrivalCountryCode: string
  departureDate: string
}>

type ApplicationSearchProps = {
  filters?: Partial<FormSchema>
  onSearchSubmit: (fields: SubmitFields) => void
}

export const ApplicationSearch = ({ filters, onSearchSubmit }: ApplicationSearchProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema)
  })
  const { handleSubmit, reset, watch } = useFormProps

  useEffect(() => {
    if (!searchParams || !searchParams.size || !pathname) return

    const departure = searchParams.get('departure')
    const departureCountry = searchParams.get('departureCountry')
    const departureCity = searchParams.get('departureCity')
    const departureCountryCode = searchParams.get('departureCountryCode')
    const arrival = searchParams.get('arrival')
    const arrivalCountry = searchParams.get('arrivalCountry')
    const arrivalCity = searchParams.get('arrivalCity')
    const arrivalCountryCode = searchParams.get('arrivalCountryCode')
    const departureDate = searchParams.get('departureDate')

    reset({
      departure: departure || undefined,
      departureCountry: departureCountry || undefined,
      departureCity: departureCity || undefined,
      departureCountryCode: departureCountryCode || undefined,
      arrival: arrival || undefined,
      arrivalCountry: arrivalCountry || undefined,
      arrivalCity: arrivalCity || undefined,
      arrivalCountryCode: arrivalCountryCode || undefined,
      departureDate: departureDate || undefined
    })

    onSearchSubmit({
      departure: departure || undefined,
      departureCountry: departureCountry || undefined,
      departureCity: departureCity || undefined,
      departureCountryCode: departureCountryCode || undefined,
      arrival: arrival || undefined,
      arrivalCountry: arrivalCountry || undefined,
      arrivalCity: arrivalCity || undefined,
      arrivalCountryCode: arrivalCountryCode || undefined,
      departureDate: departureDate || undefined
    })

    router.replace(ROUTE_NAMES.SEARCH)
  }, [searchParams, reset])

  useEffect(() => {
    if (!filters) return

    const filterWithValues = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => Boolean(value))
    )

    reset(filterWithValues)
  }, [filters, reset])

  const onFormSubmit = ({
    departure,
    departureCountry,
    departureCity,
    departureCountryCode,
    arrival,
    arrivalCountry,
    arrivalCity,
    arrivalCountryCode,
    departureDate
  }: FormSchema) => {
    onSearchSubmit({
      departure: departure || undefined,
      departureCountry: departureCountry || undefined,
      departureCity: departureCity || undefined,
      departureCountryCode: departureCountryCode || undefined,
      arrival: arrival || undefined,
      arrivalCountry: arrivalCountry || undefined,
      arrivalCity: arrivalCity || undefined,
      arrivalCountryCode: arrivalCountryCode || undefined,
      departureDate: departureDate || undefined
    })
  }

  return (
    <FormProvider {...useFormProps}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={cn(classes.applicationSearch, 'card', 'noBorder')}>
          <Typography fontSize={24} fontWeight={700}>
            Search
          </Typography>

          <div className={classes.routeSearch}>
            <InputLabel>Select a route</InputLabel>

            <RouteAutocomplete cityOnly />
          </div>

          <FormControl className={classes.departureDate}>
            <InputLabel htmlFor='departureDate'>Select a departure date</InputLabel>

            <DatePicker
              id='departureDate'
              name='departureDate'
              placeholder='Date'
              required={false}
            />
          </FormControl>

          <Button fullWidth size='large' type='submit'>
            Find out more
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
