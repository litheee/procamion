'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/shared/ui'
import { ResponseAcceptConfirmModal } from '../ResponseAcceptConfirmModal/ResponseAcceptConfirmModal'

import { useChooseRouteResponse } from '../../model/useChooseRouteResponse'
import { rejectRouteResponse } from '../../api/response'

import classes from './RouteResponseActions.module.scss'

type RouteResponseActionsProps = {
  responseId: string
  routeId: string
}

export const RouteResponseActions = ({ responseId, routeId }: RouteResponseActionsProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const { mutate: acceptResponse, isPending: isResponseAccepting } = useChooseRouteResponse({
    onSuccess: () => {
      router.push('/profile/applications')

      queryClient.invalidateQueries({
        queryKey: ['carrier-routes']
      })
    }
  })

  const { mutate: rejectResponse, isPending: isResponseRejecting } = useMutation({
    mutationFn: rejectRouteResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['carrier-routes']
      })

      queryClient.invalidateQueries({
        queryKey: ['route-responses']
      })
    }
  })

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

      <Button
        isLoading={isResponseRejecting}
        type='button'
        size='small'
        color='error'
        onClick={() => {
          rejectResponse({ routeId, responseId })
        }}
      >
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
