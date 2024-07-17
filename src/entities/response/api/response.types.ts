type UserInfo = {
  id: string
  first_name: string
  last_name: string
}

type ResponseBase = {
  id: string
  created_at: string
  updated_at: string
  message: string
}

export type RouteResponse = ResponseBase & {
  shipper: UserInfo
}

export type CargoResponse = ResponseBase & {
  carrier_id: string
  carrier: UserInfo
}
