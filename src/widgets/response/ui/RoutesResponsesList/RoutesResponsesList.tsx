'use client'

import { useState } from 'react'
import cn from 'classnames'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import { RouteResponseActions } from '@/features/response'
import { formatDate } from '@/shared/utils'
import { Pagination } from '@/shared/ui'

import classes from './RoutesResponsesList.module.scss'
import { AvatarIcon } from '../../../../../public/icons/sidebar/Avatar'

type RoutesResponsesListProps = {
  status: 'Active' | 'Archived'
}

export const RoutesResponsesList = ({}: RoutesResponsesListProps) => {
  const PAGE_ITEMS_SIZE = status === 'Active' ? 5 : 8

  const routes = [
    {
      id: '1',
      createDate: '2024-07-15T02:01:29.904312Z',
      updateDate: '2024-07-15T02:01:29.904312Z',
      commentDate: '2024-07-15T02:01:29.904312Z',
      firstName: 'Name',
      lastName: 'Surname',
      comment:
        'I would like to sincerely thank Mohammed for the delicate and timely delivery of the cargo. A very cultured and intelligent employee.'
    }
  ]

  const [page, setPage] = useState(1)

  return (
    <div className={classes.routesResponsesList}>
      <ul className={classes.list}>
        {routes.map((route) => {
          return (
            <li key={route.id} className={cn(classes.routeCard, 'card')}>
              <div className={classes.routeCardTop}>
                <Typography fontSize={18} fontWeight={700}>
                  Route ({formatDate(route.createDate)})
                </Typography>
              </div>

              <div className={classes.responseBody}>
                <div className={classes.responseUser}>
                  <div className={classes.responseUserAvatar}>
                    <AvatarIcon />
                  </div>

                  <div className={classes.responseUserInfo}>
                    <p>
                      {route.firstName} {route.lastName}
                    </p>
                    <p>{formatDate(route.commentDate)}</p>
                  </div>
                </div>

                <div className={classes.responseComment}>
                  <p>Comment</p>
                  <p>{route.comment}</p>
                </div>
              </div>

              <div className={classes.routeResponseActions}>
                <RouteResponseActions responseId='123' routeId={route.id} />
              </div>
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

      {routes && routes.length === 0 && !true ? (
        <p className='noData'>You have no responses to your cargoes</p>
      ) : null}

      <div className={classes.pagination}>
        <Pagination isLoading={false} currentPage={page} totalPages={100} onPageChange={setPage} />
      </div>
    </div>
  )
}
