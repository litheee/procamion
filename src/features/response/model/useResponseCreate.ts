'use client'

import { useUser } from '@/shared/hooks/useUser'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  createCargoResponse as createCargoResponseAPI,
  createRouteResponse as createRouteResponseAPI
} from '../api/response'

type UseResponseCreateProps = {
  onSuccess: () => void
}

export const useResponseCreate = ({ onSuccess }: UseResponseCreateProps) => {
  const { userRole } = useUser()

  const onResponseCreateSuccess = () => {
    toast.success('Your response has been sent successfully')

    onSuccess()
  }

  const { mutate: createCargoResponse, isPending: cargoResponseInProcess } = useMutation({
    mutationFn: createCargoResponseAPI,
    onSuccess: onResponseCreateSuccess
  })

  const { mutate: createRouteResponse, isPending: routeResponseInProcess } = useMutation({
    mutationFn: createRouteResponseAPI,
    onSuccess: onResponseCreateSuccess
  })

  return {
    createResponse: userRole === 'CARRIER' ? createCargoResponse : createRouteResponse,
    inProcess: cargoResponseInProcess || routeResponseInProcess
  }
}
