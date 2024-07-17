'use client'

import { useMutation } from '@tanstack/react-query'

import { chooseRouteResponse } from '../api/response'
import { toast } from 'react-toastify'

export const useChooseRouteResponse = () => {
  return useMutation({
    mutationFn: chooseRouteResponse,
    onSuccess: () => {
      toast.success('You have successfully accepted the reponse')
    }
  })
}
