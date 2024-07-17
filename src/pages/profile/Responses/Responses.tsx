'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { CargoesResponsesList, RoutesResponsesList } from '@/widgets/response'

import { useUser } from '@/shared/hooks/useUser'

import classes from './Responses.module.scss'

type TabValue = 'Active' | 'Archived'

export const ProfileResponsesPage = () => {
  const { userRole } = useUser()

  const [tab, setTab] = useState<TabValue>('Active')

  return (
    <div className={classes.profileResponses}>
      <Tabs
        className={classes.tabs}
        value={tab}
        onChange={(_, tabValue) => {
          setTab(tabValue)
        }}
      >
        <Tab value='Active' label='Active' />
        <Tab value='Archived' label='Archived' />
      </Tabs>

      <div className={classes.responsesList}>
        {userRole === 'CARRIER' ? <CargoesResponsesList status={tab} /> : null}
        {userRole === 'SHIPPER' ? <RoutesResponsesList status={tab} /> : null}
      </div>
    </div>
  )
}
