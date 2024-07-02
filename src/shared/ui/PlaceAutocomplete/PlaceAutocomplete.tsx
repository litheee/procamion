'use client'

import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { usePlacesWidget } from 'react-google-autocomplete'
import InputAdornment from '@mui/material/InputAdornment'

import { TextField } from '../TextField/TextField'

import classes from './PlaceAutocomplete.module.scss'

type PlaceAutocompleteProps = {
  name: string
  placeholder?: string
}

export const PlaceAutocomplete = ({ name, placeholder }: PlaceAutocompleteProps) => {
  const { setValue, watch } = useFormContext()

  const countryCode = watch(`${name}CountryCode`)

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      const { address_components, formatted_address: address } = place

      setValue(name, address)
      // @ts-ignore
      const countryPart = address_components.find(({ types }) => types.includes('country'))

      if (countryPart) {
        setValue(`${name}CountryCode`, countryPart.short_name)
      }
    },
    options: {
      types: ['address']
    }
  })

  return (
    <div className={classes.placeAutocomplete}>
      <TextField
        name={name}
        placeholder={placeholder}
        InputProps={{
          inputRef: materialRef,
          startAdornment: countryCode ? (
            <InputAdornment position='start' className={classes.countryStartAdornment}>
              <Image
                width={24}
                height={24}
                src={`https://flagsapi.com/${countryCode}/flat/24.png`}
                alt={countryCode}
              />
            </InputAdornment>
          ) : null
        }}
      />

      <TextField name={`${name}CountryCode`} hidden className={classes.countryCodeField} />
    </div>
  )
}
