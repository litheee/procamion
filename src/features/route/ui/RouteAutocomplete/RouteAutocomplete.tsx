'use client'

import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

import { PlaceAutocomplete } from '@/shared/ui'

import classes from './RouteAutocomplete.module.scss'

type RouteAutocompleteProps = {}

export const RouteAutocomplete = ({}: RouteAutocompleteProps) => {
  const { getValues, setValue } = useFormContext()

  const switchLocations = () => {
    const [departure, departureCountryCode, destination, destinationCountryCode] = getValues([
      'departure',
      'departureCountryCode',
      'destination',
      'destinationCountryCode'
    ])

    setValue('departure', destination)
    setValue('destination', departure)

    setValue('departureCountryCode', destinationCountryCode)
    setValue('destinationCountryCode', departureCountryCode)
  }

  return (
    <div className={classes.routeAutocomplete}>
      <PlaceAutocomplete name='departure' placeholder='Departure' />

      <PlaceAutocomplete name='destination' placeholder='Destination' />

      <button type='button' className={classes.switchButton} onClick={switchLocations}>
        <Image width={13.9} height={13.8} src='./icons/switch.svg' alt='switch' />
      </button>
    </div>
  )
}
