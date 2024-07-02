import { API } from '@/shared/api'

import type { ShipperProfileInfo } from './shipper.types'

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
