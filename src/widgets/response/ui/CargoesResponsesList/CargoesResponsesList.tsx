'use client'

import { useState } from 'react'
import cn from 'classnames'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

import { Pagination } from '@/shared/ui'
import { ApplicationInfo, type ApplicationInfoType } from '@/entities/application'
import { CargoResponseActions } from '@/features/response'
import { formatDate } from '@/shared/utils'

import classes from './CargoesResponsesList.module.scss'

type CargoesResponsesListProps = {
  status: 'Active' | 'Archived'
}

export const CargoesResponsesList = ({ status }: CargoesResponsesListProps) => {
  const PAGE_ITEMS_SIZE = status === 'Active' ? 5 : 8

  const cargoes = [
    {
      id: '182e26cc-a5f5-4064-aedb-d9058a9a6edd',
      createDate: '2024-07-06T18:46:36.098507Z',
      updateDate: '2024-07-15T04:15:21.634259Z',
      status: 'OPEN' as const,
      comment:
        'long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment long comment ',
      departureCountry: 'Russia',
      arrivalCountry: 'Mexico',
      departureCity: 'Sankt-Peterburg',
      arrivalCity: 'Cancún',
      departureDate: '2024-07-07',
      temperature: 10,
      palletsNumber: 19,
      ltlPrice: 106,
      ftlPrice: 2000,
      currency: 'USD' as const
    },
    {
      id: '674084f2-f8d0-4e47-8d20-ef25cc8aaccd',
      createDate: '2024-07-15T02:01:29.904312Z',
      updateDate: '2024-07-15T02:01:29.904312Z',
      status: 'OPEN' as const,
      comment: 'Testing comment',
      departureCountry: 'Russia',
      arrivalCountry: 'Russia',
      departureCity: 'Sankt-Peterburg',
      arrivalCity: 'Zelenograd',
      departureDate: '2024-07-16',
      temperature: 20,
      palletsNumber: 19,
      ltlPrice: 50000,
      ftlPrice: 2000,
      currency: 'USD' as const
    }
  ] as ApplicationInfoType[]

  const [page, setPage] = useState(1)

  return (
    <div className={classes.cargoesResponsesList}>
      <ul className={classes.list}>
        {cargoes.map((cargo) => {
          return (
            <li key={cargo.id} className={cn(classes.cargoCard, 'card')}>
              <ApplicationInfo
                application={cargo}
                slots={{
                  top: (
                    <div className={classes.cargoCardTop}>
                      <Typography fontSize={18} fontWeight={700}>
                        Cargo ({formatDate(cargo.createDate)})
                      </Typography>
                    </div>
                  ),
                  bottom: (
                    <div className={classes.cargoResponseActions}>
                      <CargoResponseActions responseId='123' cargoId={cargo.id} />
                    </div>
                  )
                }}
              />
            </li>
          )
        })}

        {false
          ? Array.from({ length: PAGE_ITEMS_SIZE }).map((_, idx) => {
              return (
                <li key={idx}>
                  <Skeleton height={status === 'Active' ? 215 : 103} />
                </li>
              )
            })
          : null}
      </ul>

      {cargoes && cargoes.length === 0 && !true ? (
        <p className='noData'>You have no responses to your routes</p>
      ) : null}

      <div className={classes.pagination}>
        <Pagination isLoading={false} currentPage={page} totalPages={100} onPageChange={setPage} />
      </div>
    </div>
  )
}
