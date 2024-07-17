import { API } from '@/shared/api'

import { transfromCargo, type CargoesListResponse } from '@/entities/cargo'
import type { GetShipperCargoesPayload, ShipperProfileInfo } from './shipper.types'
import { ResponseList } from '@/shared/api/types'
import { RouteResponse, transfromRouteResponse } from '@/entities/response'

const transformShipper = (Shipper: ShipperProfileInfo) => {
  const {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phone,
    city,
    company_name: companyName,
    country,
    email_verified: isEmailVerified,
    language,
    phone_number_verified: isPhoneVerified,
    verified
  } = Shipper

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    city,
    companyName,
    country,
    language,
    isEmailVerified,
    isPhoneVerified,
    verified
  }
}

export const getShipperProfileInfo = async () => {
  const { data } = await API.get<ShipperProfileInfo>('/shippers')

  return transformShipper(data)
}

export const getShipperCargoes = async ({ page, pageSize, status }: GetShipperCargoesPayload) => {
  const { data } = await API.get<CargoesListResponse>('/shippers/cargo-applications', {
    params: {
      page_number: page,
      page_size: pageSize,
      statuses: status
    }
  })

  return {
    applicationsList: data.content.map(transfromCargo),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}

export const getShipperResponses = async () => {
  const { data } = await API.get<ResponseList<RouteResponse>>('/shippers/route-responses')

  return {
    responses: data.content.map(transfromRouteResponse),
    itemsNumber: data.total_items,
    pagesNumber: data.total_pages
  }
}
