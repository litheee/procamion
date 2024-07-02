import { Typography } from '@mui/material'
import Image from 'next/image'

import classes from './CargoInfo.module.scss'
import { ClockIcon } from '../../../../../public/icons/Clock'

type LoadType = 'LTL' | 'FTL' | 'NEGOTIATABLE'

type CargoInfoProps = {
  loadType: LoadType
}

export const CargoInfo = ({ loadType }: CargoInfoProps) => {
  return (
    <div className={classes.cargoInfo}>
      <div className={classes.column}>
        <Typography className={classes.columnTitle}>Departure</Typography>

        <div className={classes.row}>
          <span>
            <Image width={20} height={20} src='./icons/placemark.svg' alt='placemark' />
          </span>

          <span>MA, Ait Melloul</span>
        </div>

        <div className={classes.row}>
          <span>
            <ClockIcon />
          </span>

          <span>12.08.23</span>
        </div>
      </div>

      <div className={classes.column}>
        <Typography className={classes.columnTitle}>Arrival</Typography>

        <div className={classes.row}>
          <span>
            <Image width={20} height={20} src='./icons/placemark.svg' alt='placemark' />
          </span>

          <span>NL, Barendrecht</span>
        </div>
      </div>

      <div className={classes.column}>
        <Typography className={classes.columnTitle}>°C and volume</Typography>

        <div className={classes.row}>
          <span>
            <Image width={20} height={20} src='./icons/temperature.svg' alt='temperature' />
          </span>

          <span>+8 °C</span>
        </div>

        <div className={classes.row}>
          <span>
            <Image width={20} height={20} src='./icons/pallet.svg' alt='pallet' />
          </span>

          <span>20 pal</span>
        </div>
      </div>

      <div className={classes.column}>
        {loadType === 'LTL' ? (
          <div className={classes.ltl}>
            <span>LTL</span>
            <span>1960 MAD</span>
            <span>/pal</span>
          </div>
        ) : null}

        {loadType === 'FTL' ? (
          <div className={classes.ftl}>
            <span>FTL</span>
            <span>32 000 MAD</span>
          </div>
        ) : null}

        {loadType === 'NEGOTIATABLE' ? (
          <div className={classes.negotiatable}>
            <Typography>Negotiatable</Typography>
          </div>
        ) : null}
      </div>
    </div>
  )
}
