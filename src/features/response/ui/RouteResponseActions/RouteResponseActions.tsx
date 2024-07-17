'use client'

import { useState } from 'react'

import { Button } from '@/shared/ui'
import { useChooseRouteResponse } from '../../model/useChooseRouteResponse'
import { ResponseAcceptConfirmModal } from '../ResponseAcceptConfirmModal/ResponseAcceptConfirmModal'

import classes from './RouteResponseActions.module.scss'

type RouteResponseActionsProps = {
  responseId: string
  routeId: string
}

export const RouteResponseActions = ({ responseId, routeId }: RouteResponseActionsProps) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const { mutate: acceptResponse, isPending: isResponseAccepting } = useChooseRouteResponse()

  return (
    <div className={classes.routeResponseActions}>
      <Button
        isLoading={isResponseAccepting}
        type='button'
        size='small'
        onClick={() => {
          setConfirmModalOpen(true)
        }}
      >
        Accept
      </Button>

      <Button type='button' size='small' color='error'>
        Reject
      </Button>

      <ResponseAcceptConfirmModal
        open={isConfirmModalOpen}
        onConfirm={() => {
          acceptResponse({ routeId, responseId })
        }}
        onClose={() => {
          setConfirmModalOpen(false)
        }}
      />
    </div>
  )
}