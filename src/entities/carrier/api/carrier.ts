import { API } from '@/shared/api'

import type { CarrierProfileInfo } from './carrier.types'

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
