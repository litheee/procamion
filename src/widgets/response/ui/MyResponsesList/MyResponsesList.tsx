'use client'

import cn from 'classnames'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import { Button, Pagination } from '@/shared/ui'
import { ApplicationInfo, ApplicationInfoModal, ApplicationInfoType } from '@/entities/application'
import { ResponseEdit } from '@/features/response'

import { useMyResponses } from '@/entities/response'
import { useResponseDelete } from '@/features/response'
import { useUser } from '@/shared/hooks/useUser'
import { formatDate } from '@/shared/utils'

import classes from './MyResponsesList.module.scss'

type Status = 'Active' | 'Archived'

type SelectedResponse = {
  id: string
  message: string
  application: ApplicationInfoType
}

type MyResponsesListProps = {
  status: Status
}

export const MyResponsesList = ({ status }: MyResponsesListProps) => {
  const PAGE_ITEMS_SIZE = status === 'Active' ? 5 : 8

  const [page, setPage] = useState(1)
  const [selectedResponse, setSelectedResponse] = useState<SelectedResponse>()

  const { userRole } = useUser()

  const {
    data: responses,
    isLoading: isResponsesLoaidng,
    pagesNumber
  } = useMyResponses({
    pageSize: PAGE_ITEMS_SIZE,
    page,
    status
  })

  const { deleteResponse, inProcess: deletingResponseInProgress } = useResponseDelete({
    onSuccess: () => {
      setSelectedResponse(undefined)
    }
  })

  return (
    <>
      <ul className={classes.applicationsList}>
        {responses && !isResponsesLoaidng
          ? responses.map(({ id, createDate, application, message }) => {
              return (
                <li
                  key={id}
                  className={cn(classes.applicationCard, 'card')}
                  onClick={() => {
                    setSelectedResponse({
                      id,
                      message,
                      application
                    })
                  }}
                >
                  <ApplicationInfo
                    application={application}
                    slots={{
                      top: (
                        <div className={classes.applicationCardTop}>
                          <Typography fontSize={18} fontWeight={700}>
                            {userRole === 'CARRIER' ? 'Route' : 'Cargo'} ({formatDate(createDate)})
                          </Typography>
                        </div>
                      ),
                      bottom: (
                        <div className={classes.applicationCardBottom}>
                          <Button
                            type='button'
                            size='small'
                            onClick={() => {
                              setSelectedResponse({
                                id,
                                message,
                                application
                              })
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            type='button'
                            size='small'
                            color='error'
                            isLoading={deletingResponseInProgress}
                            onClick={() => {
                              deleteResponse(id)
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )
                    }}
                  />
                </li>
              )
            })
          : null}

        {isResponsesLoaidng
          ? Array.from({ length: PAGE_ITEMS_SIZE }).map((_, idx) => {
              return (
                <li key={idx}>
                  <Skeleton height={215} />
                </li>
              )
            })
          : null}
      </ul>

      {responses && responses.length === 0 && !isResponsesLoaidng ? (
        <p className='noData'>Responses not found</p>
      ) : null}

      {selectedResponse ? (
        <ApplicationInfoModal
          grayBox
          open={Boolean(selectedResponse)}
          title={userRole === 'CARRIER' ? 'Route' : 'Cargo'}
          application={selectedResponse.application}
          slots={{
            bottom: (
              <ResponseEdit
                responseId={selectedResponse.id}
                comment={selectedResponse.message}
                onResponseEdit={() => {
                  setSelectedResponse(undefined)
                }}
                onEditCancel={() => {
                  setSelectedResponse(undefined)
                }}
              />
            )
          }}
          onClose={() => {
            setSelectedResponse(undefined)
          }}
        />
      ) : null}

      <div className={classes.pagination}>
        <Pagination
          isLoading={isResponsesLoaidng}
          currentPage={page}
          totalPages={pagesNumber}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
