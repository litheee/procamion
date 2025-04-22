'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/shared/ui'
import { ResponseAcceptConfirmModal } from '../ResponseAcceptConfirmModal/ResponseAcceptConfirmModal'

import { useChooseCargoResponse } from '../../model/useChooseCargoResponse'
import { rejectCargoResponse } from '../../api/response'

import classes from './CargoResponseActions.module.scss'

type CargoResponseActionsProps = {
  responseId: string
  cargoId: string
}

export const CargoResponseActions = ({ responseId, cargoId }: CargoResponseActionsProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const { mutate: acceptResponse, isPending: isResponseAccepting } = useChooseCargoResponse({
    onSuccess: () => {
      router.push('/profile/applications')

      queryClient.invalidateQueries({
        queryKey: ['shipper-cargoes']
      })
    }
  })

  const { mutate: rejectResponse, isPending: isResponseRejecting } = useMutation({
    mutationFn: rejectCargoResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shipper-cargoes']
      })

      queryClient.invalidateQueries({
        queryKey: ['cargo-responses']
      })
    }
  })

  return (
    <div className={classes.cargoResponseActions}>
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
          rejectResponse({ cargoId, responseId })
        }}
      >
        Reject
      </Button>

      <ResponseAcceptConfirmModal
        open={isConfirmModalOpen}
        onConfirm={() => {
          acceptResponse({ cargoId, responseId })
        }}
        onClose={() => {
          setConfirmModalOpen(false)
        }}
      />
    </div>
  )
}
