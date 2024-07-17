'use client'

import Image from 'next/image'
import { useState } from 'react'

import { ApplicationInfoModal, ApplicationInfoType } from '@/entities/application'
import { CargoCreateEditModal, useCargoDelete } from '@/features/cargo'
import { RouteCreateEditModal, useRouteDelete } from '@/features/route'
import { Button } from '@/shared/ui'

import classes from './MyApplicationModal.module.scss'

type MyApplicationModalProps = {
  type: 'Cargo' | 'Route'
  application: ApplicationInfoType
  open: boolean
  onClose: () => void
}

export const MyApplicationModal = ({
  type,
  application,
  open,
  onClose
}: MyApplicationModalProps) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  const onActionSuccess = () => {
    setEditModalOpen(false)
    onClose()
  }

  const { mutate: deleteCargo, isPending: isCargoDeleting } = useCargoDelete({
    onSuccess: onActionSuccess
  })

  const { mutate: deleteRoute, isPending: isRouteDeleting } = useRouteDelete({
    onSuccess: onActionSuccess
  })

  const deleteApplication = (applicationId: string) => {
    if (type === 'Cargo') {
      deleteCargo(applicationId)
    }

    if (type === 'Route') {
      deleteRoute(applicationId)
    }
  }

  return (
    <>
      <ApplicationInfoModal
        title={type}
        application={application}
        open={open}
        slots={{
          bottom: (
            <div className={classes.bottom}>
              <button className={classes.offersButton}>
                You have 5 offers{' '}
                <Image width={12} height={12} src='/icons/arrow-right.svg' alt='arrow right' />
              </button>

              <div className={classes.actions}>
                <Button
                  type='button'
                  size='small'
                  color='secondary'
                  onClick={() => {
                    setEditModalOpen(true)
                  }}
                >
                  Edit
                </Button>

                <Button
                  isLoading={isCargoDeleting || isRouteDeleting}
                  type='button'
                  size='small'
                  color='error'
                  onClick={() => {
                    deleteApplication(application.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )
        }}
        onClose={onClose}
      />

      {type === 'Cargo' ? (
        <CargoCreateEditModal
          inEditMode
          cargo={application}
          open={isEditModalOpen}
          onClose={onActionSuccess}
        />
      ) : null}

      {type === 'Route' ? (
        <RouteCreateEditModal
          inEditMode
          route={application}
          open={isEditModalOpen}
          onClose={onActionSuccess}
        />
      ) : null}
    </>
  )
}
