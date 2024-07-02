'use client'

import cn from 'classnames'
import { useState } from 'react'

import { CargoInfo } from '@/entities/cargo'
import { Pagination } from '@/shared/ui'

import classes from './CargoesSearchResultList.module.scss'

type CargoesSearchResultListProps = {}

export const CargoesSearchResultList = ({}: CargoesSearchResultListProps) => {
  const [page, setPage] = useState(82)

  const cargoes = [
    { id: 0, loadType: 'LTL' as const },
    { id: 1, loadType: 'FTL' as const },
    { id: 2, loadType: 'NEGOTIATABLE' as const },
    { id: 3, loadType: 'LTL' as const },
    { id: 4, loadType: 'FTL' as const },
    { id: 5, loadType: 'NEGOTIATABLE' as const },
    { id: 6, loadType: 'LTL' as const },
    { id: 7, loadType: 'FTL' as const }
  ]

  return (
    <div className={classes.cargoesSearchResultList}>
      <ul className={classes.cargoesList}>
        {cargoes.map(({ id, loadType }) => (
          <li key={id}>
            <div className={cn('card', 'pvMedium')}>
              <CargoInfo loadType={loadType} />
            </div>
          </li>
        ))}
      </ul>

      <div className={classes.pagination}>
        <Pagination currentPage={page} totalPages={100} onPageChange={setPage} />
      </div>
    </div>
  )
}
