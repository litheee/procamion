'use client'

import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { MainSearchPanel } from '@/widgets/search'
import { CargoesSearchResultList } from '@/widgets/cargo'

import classes from './Search.module.scss'

export const SearchPage = () => {
  return (
    <div>
      <div className={classes.layout}>
        <MainSearchPanel />

        <div className={classes.content}>
          <Typography variant='h1' fontSize={32} fontWeight={700}>
            Active requests for transport
          </Typography>

          <Tabs className={classes.tabs} value={0} onChange={() => {}}>
            <Tab label='Freight and cargoes' />
            <Tab label='Routes' />
          </Tabs>

          <div className={classes.cargoesList}>
            <CargoesSearchResultList />
          </div>
        </div>
      </div>
    </div>
  )
}
