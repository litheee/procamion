import { API } from '@/shared/api'

import { transformRoute, type RoutesListResponse } from '@/entities/route'
import { transfromCargoResponse, type CargoResponse } from '@/entities/response'

import type { CarrierProfileInfo, GetCarrierRoutesPayload } from './carrier.types'
import type { ResponseList } from '@/shared/api/types'

const transformCarrier = (carrier: CarrierProfileInfo) => {
  const {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phone,
    driving_license: number,
    driving_license_expiration_date: expireDate,
    driving_license_issuance_date: issuanceDate,
    city,
    country,
    language
  } = carrier

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
    language,
    drivingLicense: {
      number,
      expireDate,
      issuanceDate
    }
  }
}

export const getCarrierProfileInfo = async () => {
  const { data } = await API.get<CarrierProfileInfo>('/carriers')

  return transformCarrier(data)
}

export const getCarrierRoutes = async ({ page, pageSize, status }: GetCarrierRoutesPayload) => {
  const { data } = await API.get<RoutesListResponse>('/carriers/route-applications', {
    params: {
      page_number: page,
      page_size: pageSize,
      statuses: status
    }
  })

  return {
    applicationsList: data.content.map(transformRoute),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}

export const getCarrierResponses = async () => {
  const { data } = await API.get<ResponseList<CargoResponse>>('/carriers/cargo-responses')

  return {
    responses: data.content.map(transfromCargoResponse),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}
