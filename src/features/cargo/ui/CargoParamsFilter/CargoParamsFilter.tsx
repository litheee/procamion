import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { SliderWithInputs } from '@/shared/ui'

import classes from './CargoParamsFilter.module.scss'

type CargoParamsFilterProps = {}

export const CargoParamsFilter = ({}: CargoParamsFilterProps) => {
  return (
    <div className={classes.cargoParamsFilter}>
      <FormControl>
        <InputLabel>The price range</InputLabel>

        <div className={classes.paramFieldRow}>
          <SliderWithInputs
            name='priceRange'
            step={100}
            max={100_000}
            startPlaceholder='0'
            endPlaceholder='Max'
          />
        </div>
      </FormControl>

      <FormControl>
        <InputLabel>Number of pallets</InputLabel>

        <div className={classes.paramFieldRow}>
          <SliderWithInputs
            name='palletsNumberRange'
            min={1}
            max={19}
            startPlaceholder='3'
            endPlaceholder='20'
          />
        </div>
      </FormControl>

      <FormControl>
        <InputLabel>Temperature range</InputLabel>

        <div className={classes.paramFieldRow}>
          <SliderWithInputs
            name='temperatureRange'
            min={-20}
            max={100}
            startPlaceholder='0'
            endPlaceholder='Max'
          />
        </div>
      </FormControl>
    </div>
  )
}
