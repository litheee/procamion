'use client'

import { useMutation } from '@tanstack/react-query'

import { chooseCargoResponse } from '../api/response'
import { toast } from 'react-toastify'

export const useChooseCargoResponse = () => {
  return useMutation({
    mutationFn: chooseCargoResponse,
    onSuccess: () => {
      toast.success('You have successfully accepted the reponse')
    }
  })
}
